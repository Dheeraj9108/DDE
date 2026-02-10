"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Bot } from "lucide-react"
// import { format } from "date-fns"

interface Message {
  id: string
  type: "user" | "system"
  content: string
  timestamp: Date
  options?: string[]
  inputType?: "NUMBER" | "select" | "boolean"
}

interface ChatMessageProps {
  message: Message
  onOptionSelect: (message:Message,option: string, isOption: boolean) => void
}

export function ChatMessage({ message, onOptionSelect }: ChatMessageProps) {
  const isUser = message.type === "user"

  return (
    <div className={`flex items-start space-x-3 ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? "bg-secondary" : "bg-primary"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-secondary-foreground" />
        ) : (
          <Bot className="w-4 h-4 text-primary-foreground" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-xs sm:max-w-md ${isUser ? "flex justify-end" : ""}`}>
        <Card className={`${isUser ? "bg-primary text-primary-foreground" : "bg-card"} py-3 rounded-lg`}>
          <CardContent className="px-3">
            <p className="text-sm leading-relaxed">{message.content}</p>

            {!isUser && message.options && (
              <div className="mt-3 space-y-2">
                {message.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-background hover:bg-accent"
                    onClick={() => onOptionSelect(message,option, true)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Timestamp */}
        <div className={`mt-1 text-xs text-muted-foreground ${isUser ? "text-right" : "text-left"}`}>
          {/* {format(message.timestamp, "HH:mm")}   */}
        </div>
      </div>
    </div>
  )
}
