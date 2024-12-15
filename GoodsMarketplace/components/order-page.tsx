"use client"

import { useState } from "react"
import { CreditCard, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

// Mock data for cart items
const cartItems = [
  { id: 1, name: "Smartphone", price: 599, quantity: 1 },
  { id: 2, name: "Running Shoes", price: 89, quantity: 1 },
  { id: 3, name: "Coffee Maker", price: 49, quantity: 1 },
]

// Mock data for payment methods (assuming these are fetched from user's profile)
const paymentMethods = [
  { id: 1, type: "Credit Card", last4: "1234", brand: "Visa" },
  { id: 2, type: "Credit Card", last4: "5678", brand: "Mastercard" },
  { id: 3, type: "PayPal", email: "user@example.com" },
]

// Mock data for shipment methods
const shipmentMethods = [
  { id: 1, name: "Standard Shipping", price: 5, estimatedDelivery: "3-5 business days" },
  { id: 2, name: "Express Shipping", price: 15, estimatedDelivery: "1-2 business days" },
]

export default function OrderPage() {
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id)
  const [selectedShipment, setSelectedShipment] = useState(shipmentMethods[0].id)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = shipmentMethods.find(method => method.id === selectedShipment)?.price || 0
  const tax = subtotal * 0.1 // Assuming 10% tax
  const total = subtotal + shippingCost + tax

  const handlePayment = () => {
    // Implement payment processing logic here
    console.log("Processing payment...")
    // You would typically send this data to your backend to process the payment
    // and create the order
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Order</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">${item.price * item.quantity}</p>
                  </div>
                ))}
                <Separator className="my-4" />
                <div className="flex justify-between items-center mb-2">
                  <p>Subtotal</p>
                  <p className="font-semibold">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p>Shipping</p>
                  <p className="font-semibold">${shippingCost.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p>Tax</p>
                  <p className="font-semibold">${tax.toFixed(2)}</p>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between items-center">
                  <p className="font-bold">Total</p>
                  <p className="font-bold text-lg">${total.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPayment.toString()} onValueChange={(value) => setSelectedPayment(Number(value))}>
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-2 mb-4">
                      <RadioGroupItem value={method.id.toString()} id={`payment-${method.id}`} />
                      <Label htmlFor={`payment-${method.id}`} className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        {method.type === "PayPal" ? (
                          <span>{method.type} ({method.email})</span>
                        ) : (
                          <span>{method.brand} ending in {method.last4}</span>
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Shipping Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedShipment.toString()} onValueChange={(value) => setSelectedShipment(Number(value))}>
                  {shipmentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-2 mb-4">
                      <RadioGroupItem value={method.id.toString()} id={`shipment-${method.id}`} />
                      <Label htmlFor={`shipment-${method.id}`} className="flex items-center">
                        <Truck className="mr-2 h-4 w-4" />
                        <div>
                          <p>{method.name} - ${method.price}</p>
                          <p className="text-sm text-gray-500">{method.estimatedDelivery}</p>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-8">
          <Button className="w-full" size="lg" onClick={handlePayment}>
            Pay ${total.toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  )
}