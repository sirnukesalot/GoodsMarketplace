"use client"

import { useState } from "react"
import { Search, ShoppingCart, Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for products
const products = [
  { id: 1, name: "Smartphone", price: 599, category: "Electronics", rating: 4.5, image: "/placeholder.svg?height=200&width=200", description: "Latest model with advanced features" },
  { id: 2, name: "Running Shoes", price: 89, category: "Sports", rating: 4.2, image: "/placeholder.svg?height=200&width=200", description: "Comfortable and durable for long runs" },
  { id: 3, name: "Coffee Maker", price: 49, category: "Home", rating: 4.0, image: "/placeholder.svg?height=200&width=200", description: "Brew your perfect cup every morning" },
  { id: 4, name: "Novel", price: 15, category: "Books", rating: 4.7, image: "/placeholder.svg?height=200&width=200", description: "Bestselling fiction novel" },
  { id: 5, name: "Laptop", price: 999, category: "Electronics", rating: 4.8, image: "/placeholder.svg?height=200&width=200", description: "Powerful and lightweight for work and play" },
  { id: 6, name: "Yoga Mat", price: 29, category: "Sports", rating: 4.3, image: "/placeholder.svg?height=200&width=200", description: "Non-slip and eco-friendly material" },
]

const categories = ["All", "Electronics", "Sports", "Home", "Books"]

export default function MarketPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cart, setCart] = useState([])

  const filteredProducts = products.filter(product => 
    (selectedCategory === "All" || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Market</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="sr-only">Open cart</span>
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty</p>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-4 border-b">
                        <div className="flex items-center space-x-4">
                          <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded" />
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-500">${item.price}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </ScrollArea>
                {cart.length > 0 && (
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between font-semibold">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <Button className="w-full">Checkout</Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <div className="flex-grow flex overflow-hidden">
        <aside className="w-64 bg-gray-100 p-6 hidden md:block">
          <h2 className="font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <Button
                  variant={selectedCategory === category ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                </CardHeader>
                <CardContent>
                  <CardTitle>{product.name}</CardTitle>
                  <p className="text-2xl font-bold mt-2">${product.price}</p>
                  <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                  <div className="flex items-center mt-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => addToCart(product)}>
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}