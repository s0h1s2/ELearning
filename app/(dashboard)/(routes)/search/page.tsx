import { db } from '@/lib/db'
import React from 'react'
import Categories from './components/Categories'

const SearchPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  })
  return (
    <div className="p-6">
      <Categories categories={categories} />
    </div>
  )
}

export default SearchPage
