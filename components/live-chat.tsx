"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Send, Phone, Video } from "lucide-react"
import { useAuth, useSocket } from "@/components/providers"

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: Date
}

interface LiveChatProps {
  propertyId: string
  ownerId: string
  onClose: () => void
}

export function LiveChat({ propertyId, ownerId, onClose }: LiveChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()
  const { socket } = useSocket()

  useEffect(() => {
    // Initialize chat
    if (socket && user) {
      const chatId = `${propertyId}-${user.id}-${ownerId}`
      socket.emit("join_chat", chatId)

      // Listen for messages
      socket.on("receive_message", (message: Message) => {
        setMessages((prev) => [...prev, message])
      })

      socket.on("user_typing", (data: { userId: string; isTyping: boolean }) => {
        if (data.userId !== user.id) {
          setIsTyping(data.isTyping)
        }
      })

      // Load existing messages (mock data)
      const mockMessages: Message[] = [
        {
          id: "1",
          senderId: ownerId,
          senderName: "John Mukasa",
          content: "Hello! Thank you for your interest in my property. How can I help you?",
          timestamp: new Date(Date.now() - 300000),
        },
      ]
      setMessages(mockMessages)
    }

    return () => {
      if (socket) {
        socket.off("receive_message")
        socket.off("user_typing")
      }
    }
  }, [socket, user, propertyId, ownerId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = () => {
    if (!newMessage.trim() || !socket || !user) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.name,
      content: newMessage,
      timestamp: new Date(),
    }

    const chatId = `${propertyId}-${user.id}-${ownerId}`
    socket.emit("send_message", { chatId, message })

    setMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  const handleTyping = (value: string) => {
    setNewMessage(value)

    if (socket && user) {
      const chatId = `${propertyId}-${user.id}-${ownerId}`
      socket.emit("typing", { chatId, userId: user.id, isTyping: value.length > 0 })
    }
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-UG", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 h-96 shadow-xl z-50">
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-blue-600 text-white rounded-t-lg">
        <CardTitle className="text-sm">Live Chat</CardTitle>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-white hover:bg-blue-700">
            <Phone className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-white hover:bg-blue-700">
            <Video className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-white hover:bg-blue-700" onClick={onClose}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-80">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.senderId === user?.id ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-3 py-2 rounded-lg ${
                  message.senderId === user?.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.senderId === user?.id ? "text-blue-100" : "text-gray-500"}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-3 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => handleTyping(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
