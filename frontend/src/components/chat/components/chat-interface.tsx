"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChatInput } from "./chat-input";
import { ChatMessage } from "./chat-message";
import { Message } from "../interfaces/chat-interfaces";
import { CRUDService } from "../service/crud-service";
import { useNavigate } from "react-router-dom";

interface ChatInterfaceProps {
  flowId?: string;
  firstQuestion: Message;
}

export function ChatInterface({ flowId, firstQuestion }: ChatInterfaceProps) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "",
      type: "system",
      content: "Please follow the prompts to complete the guided check",
      timestamp: new Date(),
      flowId: "",
      sessionId: "",
    },
  ]);

  useEffect(() => {
    if (firstQuestion) setMessages((prev) => [...prev, firstQuestion]);
  }, [firstQuestion]);

  const [currentInput, setCurrentInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (
    message: Message,
    content: string,
    isOption = false,
  ) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: "",
      type: "user",
      content,
      timestamp: new Date(),
    };

    const payload = {
      sessionId: message?.sessionId,
      nodeId: message?.nodeId,
      prompt: message?.content,
      answer: content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentInput("");
    setIsTyping(true);

    const systemResponse = await generateSystemResponse(payload);
    if (systemResponse) {
      setMessages((prev) => [...prev, systemResponse]);
    }
    setIsTyping(false);
  };

  const generateSystemResponse = async (
    payload: any,
  ): Promise<Message | undefined> => {
    try {
      const res = await CRUDService.generateSystemResponse(payload);
      if (res.end) {
        navigate(`/flows/${flowId}/diagnose/${res?.sessionId}/summary`);
        return;
      }
      return {
        id: res.nodeId,
        type: "system",
        content: res.content,
        timestamp: new Date(),
        inputType: res.inputType,
        options: res.options,
        sessionId: res.sessionId,
        nodeId: res.nodeId,
      };
    } catch (error) {
      return {} as Message;
    }
  };

  const getAIExplaination=async(message:Message)=>{
    // const res = await CRUDService.generateAIExplaination();
    const res = {
    "commonMistakes": [
        "Not checking if all individual propellers are spinning",
        "Mistaking a brief motor 'twitch' for active spinning",
        "Testing without sufficient battery power to engage motors"
    ],
    "guidance": "Initiate the arming sequence or takeoff command and visually verify if all propellers are rotating continuously.",
    "purpose": "To determine if the issue is electrical/software (motors not starting) or mechanical/aerodynamic (motors spin but no lift)."
    };
    const responseMessage:Message = {
      type: "system",
      content: res,
      id: "",
      isAiResponse:true,
      timestamp: new Date()
    }
    setMessages((prev)=>[...prev, responseMessage])
  }

  const lastMessage = messages[messages.length - 1];
  const showInput = lastMessage?.type === "system" && lastMessage?.inputType === "NUMBER";

  return (
    <div className="overflow-y-auto no-scrollbar flex flex-col">
      <div className="flex-1 p-4 space-y-4 overflow-auto no-scrollbar">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onOptionSelect={handleSendMessage}
            getAIExplaination={getAIExplaination}
          />
        ))}

        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <div className="w-4 h-4 bg-primary-foreground rounded-full" />
            </div>
            <Card className="max-w-xs py-4 rounded-lg">
              <CardContent className="px-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {showInput && !isTyping && (
        <ChatInput
          message={lastMessage}
          currentInput={currentInput}
          setCurrentInput={setCurrentInput}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
}