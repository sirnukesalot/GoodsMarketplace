"use client"

import { useState } from "react"
import { Bell, CreditCard, Gift, Heart, Mail, Package, Settings, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const menuItems = [
  { icon: Heart, label: "Watchlist" },
  { icon: Mail, label: "Messages" },
  { icon: CreditCard, label: "Payments" },
  { icon: Package, label: "Parcels" },
  { icon: Gift, label: "Promocodes" },
  { icon: Settings, label: "Settings" },
]

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("Watchlist")

  const renderContent = () => {
    switch (activeTab) {
      case "Watchlist":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Your Watchlist</CardTitle>
              <CardDescription>Items you're keeping an eye on</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Your watched items will appear here.</p>
            </CardContent>
          </Card>
        )
      case "Messages":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Your conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <p>You have no new messages.</p>
            </CardContent>
          </Card>
        )
      case "Payments":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment options</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Your payment methods will be listed here.</p>
            </CardContent>
          </Card>
        )
      case "Parcels":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Your Parcels</CardTitle>
              <CardDescription>Track your shipments</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Your recent orders and their shipping status will appear here.</p>
            </CardContent>
          </Card>
        )
      case "Promocodes":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Promocodes</CardTitle>
              <CardDescription>Your available discounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Any active promocodes will be displayed here.</p>
            </CardContent>
          </Card>
        )
      case "Settings":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Account settings and preferences can be adjusted here.</p>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex-grow flex overflow-hidden">
        <nav className="hidden md:block bg-white w-64 p-6 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Button
                  variant={activeTab === item.label ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab(item.label)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <main className="flex-1 overflow-y-auto p-6">
          <ScrollArea className="h-full">
            {renderContent()}
          </ScrollArea>
        </main>
      </div>
      <nav className="md:hidden bg-white shadow-lg">
        <ul className="flex justify-around p-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Button
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center ${
                  activeTab === item.label ? "text-primary" : "text-gray-500"
                }`}
                onClick={() => setActiveTab(item.label)}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs mt-1">{item.label}</span>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}