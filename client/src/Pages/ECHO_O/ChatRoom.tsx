import React from "react";
import { faker } from "@faker-js/faker";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import EmojiPicker, { Theme, EmojiStyle, Emoji } from "emoji-picker-react";
import emojiRegex from "emoji-regex";
import { PiPlusLight } from "react-icons/pi";
import { VscSmiley } from "react-icons/vsc";
import type { Background } from "../../assets/BGEcho_O.tsx";

interface Props {
  darkMode: boolean;
  isDockOpen: boolean;
  selectedBg: Background;
}

interface AppleEmojiMessageProps {
  text: string;
  darkMode: boolean;
  writer: string;
  color: string;
  selectedBg: Background;
}

const AppleEmojiMessage: React.FC<AppleEmojiMessageProps> = ({
  text,
  color,
  selectedBg,
  writer,
}) => {
  const regex = emojiRegex();
  const parts = text.split(regex);
  const emojis = text.match(regex) || [];

  // Helper to convert emoji character to unified hex string (e.g., 👍 -> 1f44d)
  const getUnified = (emoji: string) => {
    return Array.from(emoji)
      .map((char) => char.codePointAt(0)?.toString(16))
      .filter(Boolean)
      .join("-"); // Joins multi-part emojis correctly
  };

  return (
    <span
      className={`apple-emoji `}
      style={{
        color:
          selectedBg.idx === 12
            ? writer === "User"
              ? "#000"
              : "#fff"
            : selectedBg.idx === 10 || selectedBg.idx === 21
              ? writer === "User"
                ? "#fff"
                : "#000"
              : selectedBg.idx === 26
                ? writer === "User"
                  ? "#000"
                  : "#fff"
                : color,
      }}
    >
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {emojis[i] && (
            <span className="inline-block align-text-bottom mx-px translate-y-0.5">
              <Emoji
                unified={getUnified(emojis[i])}
                emojiStyle={EmojiStyle.APPLE}
                size={22}
              />
            </span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
};

const initialMessages = Array.from({ length: 5 }, (_, i) => ({
  id: `msg-${i}-${Math.random()}`,
  MType: Math.random() > 0.5 ? "User" : "John Doe",
  message: faker.lorem.sentence(),
}));

const ChatRoom: React.FC<Props> = ({ darkMode, selectedBg }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Close picker on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmoji(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Smooth scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const ADD = () => {
    if (inputValue.trim() === "") return;
    const newMsg = {
      id: `msg-${Date.now()}`,
      MType: "User",
      message: inputValue,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");
    setShowEmoji(false);
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col rounded-md overflow-hidden ${darkMode ? "bg-transparent" : "bg-transparent"}`}
    >
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 custom-scrollbar"
      >
        <div className="flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isUser = msg.MType === "User";
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  key={msg.id}
                  className={`flex flex-col mb-4 ${isUser ? "items-end" : "items-start"}`}
                >
                  <motion.div
                    layout
                    className={`relative max-w-[85%] px-4 py-2 shadow-md text-black ${
                      isUser
                        ? " rounded-[18px] rounded-br-none"
                        : ` rounded-[18px] rounded-bl-none`
                    }`}
                    style={{
                      background: isUser
                        ? selectedBg.ui.bgUser
                        : selectedBg.ui.bgMessenger,
                    }}
                  >
                    <p className="text-[15px] leading-tight whitespace-pre-wrap">
                      <AppleEmojiMessage
                        selectedBg={selectedBg}
                        color={selectedBg.ui.text}
                        text={msg.message}
                        darkMode={darkMode}
                        writer={msg.MType}
                      />
                    </p>

                    {/* The Tail */}
                    <div
                      className={`absolute bottom-0 w-3 h-3`}
                      style={{
                        clipPath: isUser
                          ? "polygon(0 0, 0% 100%, 100% 100%)"
                          : "polygon(100% 0, 0 100%, 100% 100%)",
                        background: isUser
                          ? selectedBg.ui.bgUser
                          : selectedBg.ui.bgMessenger,
                      }}
                    />
                  </motion.div>
                  <span
                    className="text-[10px] mt-2 uppercase font-bold tracking-widest opacity-40"
                    style={{ color: selectedBg.ui.secondaryText }}
                  >
                    {msg.MType}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <motion.div layout className="relative flex-none p-2">
        <AnimatePresence>
          {showEmoji && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              ref={emojiPickerRef}
              className="absolute bottom-full left-2 mb-2 z-50 shadow-2xl"
            >
              <EmojiPicker
                theme={darkMode ? Theme.DARK : Theme.LIGHT}
                onEmojiClick={(d) => setInputValue((p) => p + d.emoji)}
                emojiStyle={EmojiStyle.APPLE}
                previewConfig={{ showPreview: false }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={`flex items-center gap-2 p-2 rounded-xl border transition-all duration-300 focus-within:ring-1 ${
            darkMode ? "border-transparent " : "border-zinc-200/10 "
          }`}
          style={{
            background: selectedBg.ui.bgMessenger,
          }}
        >
          <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
            <PiPlusLight
              size={22}
              className={`font-black `}
              style={{
                color: selectedBg.ui.text,
              }}
            />
          </button>

          {/* Or if you want to keep the same button structure */}
          <button
            className={`p-2 transition-transform active:scale-90 ${showEmoji ? "opacity-100" : "opacity-60"}`}
            onClick={() => setShowEmoji(!showEmoji)}
          >
            <VscSmiley
              size={22}
              className={`font-black`}
              style={{
                color: selectedBg.ui.text,
              }}
            />
          </button>

          <input
            type="text"
            placeholder="Type a message..."
            className={`flex-1 bg-transparent py-2 px-1 focus:outline-none text-sm `}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={(e) => e.key === "Enter" && ADD()}
            style={{
              background: selectedBg.ui.bgMessenger,
              color: selectedBg.ui.text,
            }}
          />
          <motion.button
            onClick={ADD}
            disabled={inputValue.trim() === ""}
            animate={{
              backgroundColor:
                inputValue.trim() === "" ? "transparent" : selectedBg.ui.accent,
              color:
                inputValue.trim() === ""
                  ? selectedBg.idx === 28
                    ? "#fff"
                    : `${selectedBg.ui.text}4A`
                  : selectedBg.ui.text,
              scale: inputValue.trim() === "" ? 1 : 1.05,
            }}
            className={`p-2.5 rounded-xl transition-colors `}
          >
            <FiSend size={18} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatRoom;
