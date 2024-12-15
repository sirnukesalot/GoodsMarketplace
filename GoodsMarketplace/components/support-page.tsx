"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const faqs = [
  {
    question: "How do I track my order?",
    answer: "You can track your order by logging into your account and visiting the 'My Orders' section. There, you'll find a list of all your orders and their current status. Click on any order to view detailed tracking information."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for most items. If you're not satisfied with your purchase, you can return it within 30 days of delivery for a full refund or exchange. Please note that items must be in their original condition and packaging."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we offer international shipping to many countries. Shipping rates and delivery times vary depending on the destination. You can see the available shipping options and costs during the checkout process."
  },
  {
    question: "How can I change or cancel my order?",
    answer: "If you need to change or cancel your order, please contact our customer support team as soon as possible. We'll do our best to accommodate your request, but please note that once an order has been shipped, it cannot be changed or cancelled."
  },
  {
    question: "Are my payment details secure?",
    answer: "Yes, we take the security of your payment information very seriously. We use industry-standard encryption technologies to protect your data during transmission. We also do not store your full credit card details on our servers."
  }
]

export default function SupportPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'support' }[]>([])
  const [inputMessage, setInputMessage] = useState("")

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: 'user' }])
      setInputMessage("")
      // Simulate a response from support
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Thank you for your message. A support representative will be with you shortly.", sender: 'support' }])
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Support Center</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  className="flex justify-between items-center w-full text-left font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  {openFAQ === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {openFAQ === index && (
                  <p className="mt-2 px-4 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
          <SheetTrigger asChild>
            <Button className="w-full">
              <MessageCircle className="mr-2 h-5 w-5" />
              Contact Support
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Chat with Support</SheetTitle>
              <SheetDescription>
                Our team is here to help. Send us a message and we'll get back to you as soon as possible.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col h-[calc(100vh-12rem)]">
              <ScrollArea className="flex-grow mt-4 mb-4 p-4 border rounded-md">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      message.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <span
                      className={`inline-block p-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {message.text}
                    </span>
                  </div>
                ))}
              </ScrollArea>
              <div className="flex items-center">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-grow mr-2"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}