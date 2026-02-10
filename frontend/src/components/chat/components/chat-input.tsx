"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "system";
  content: string;
  timestamp: Date;
  options?: string[];
  inputType?: "NUMBER" | "select" | "boolean";
}

interface ChatInputProps {
  message: Message;
  currentInput: string;
  setCurrentInput: (value: string) => void;
  onSendMessage: (message: Message, content: string, isOption: boolean) => void;
}

export function ChatInput({
  message,
  currentInput,
  setCurrentInput,
  onSendMessage,
}: ChatInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      onSendMessage(message,currentInput, false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // If there are options, don't show text input
  if (message.options && message?.options.length != 0) {
    return null;
  }

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <div className="flex-1">
          {message.inputType === "NUMBER" && currentInput.length > 50 ? (
            <Textarea
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your response..."
              className="min-h-[60px] resize-none bg-background"
              rows={2}
            />
          ) : (
            <Input
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your response..."
              className="bg-background"
            />
          )}
        </div>
        <Button type="submit" disabled={!currentInput.trim()}>
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
