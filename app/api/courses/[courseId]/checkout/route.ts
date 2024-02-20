import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(request: Request, { params }: { params: { courseId: string } }) {
  try {
    const user = await currentUser()
    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized user", { status: 401 })
    }
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true
      }
    })
    if (!course) {
      return new NextResponse("Not found", { status: 404 })
    }
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId
        }
      }
    })

    if (purchase) {
      return new NextResponse("Already Purchased ", { status: 400 })
    }
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [{
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: course.title,
          description: course.description!
        },
        unit_amount: Math.round(course.price! * 100)
      }
    }]
    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: { userId: user.id },
      select: {
        stripeCustomerId: true
      }
    })
    if (!stripeCustomer) {
      const newCustomer = await stripe.customers.create({
        email: user.emailAddresses.at(0)?.emailAddress
      })
      stripeCustomer = await db.stripeCustomer.create({
        data: {
          stripeCustomerId: newCustomer.id,
          userId: user.id,
        }
      })
    }
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${params.courseId}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${params.courseId}?cancel=1`,
      metadata: {
        courseId: course.id,
        userId: user.id
      }
    })
    return NextResponse.json({ url: session.url })

  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error)
    return new NextResponse("Internal Error", { status: 500 })

  }
}
