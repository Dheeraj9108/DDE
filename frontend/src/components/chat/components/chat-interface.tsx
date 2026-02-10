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
      sessionId: message.sessionId,
      nodeId: message.nodeId,
      prompt: message.content,
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

// {
//   id: "2",
//   type: "system",
//   content: "Are you currently experiencing any chest pain or discomfort?",
//   timestamp: new Date(),
//   inputType: "boolean",
//   options: ["Yes", "No"],
// },

//  const generateSystemResponse = (
//     userInput: string,
//     isOption: boolean,
//   ): Message => {
//     const responses = [
//       {
//         content:
//           "Thank you for that information. Can you describe the intensity of the pain on a scale of 1-10?",
//         inputType: "text" as const,
//       },
//       {
//         content: "How long have you been experiencing these symptoms?",
//         inputType: "select" as const,
//         options: [
//           "Less than 1 hour",
//           "1-6 hours",
//           "6-24 hours",
//           "More than 24 hours",
//         ],
//       },
//       {
//         content:
//           "Do you have any history of heart disease or high blood pressure?",
//         inputType: "boolean" as const,
//         options: ["Yes", "No"],
//       },
//       {
//         content:
//           "Based on your responses, I recommend seeking immediate medical attention. Please contact your healthcare provider or visit the nearest emergency room.",
//         inputType: undefined,
//       },
//     ];

//     const randomResponse =
//       responses[Math.floor(Math.random() * responses.length)];

//     return {
//       id: Date.now().toString(),
//       type: "system",
//       content: randomResponse.content,
//       timestamp: new Date(),
//       inputType: randomResponse.inputType,
//       options: randomResponse.options,
//     };
//   };
