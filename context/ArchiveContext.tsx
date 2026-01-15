"use client";
import React, { createContext, useContext, useState, useMemo, useEffect } from "react";

interface ArchiveItem {
  id: string | number;
  name: string;
  brand: string;
  price: number;
  img: string;
  category: "Denim" | "Tops" | "Shorts";
  isSold?: boolean;
}

interface ArchiveContextType {
  archive: ArchiveItem[];
  isArchiveOpen: boolean;
  addToArchive: (item: ArchiveItem) => void;
  removeFromArchive: (id: string | number) => void;
  setIsArchiveOpen: (isOpen: boolean) => void;
  archiveTotal: number;
  archiveCount: number;
  clearArchive: () => void;
}

const ArchiveContext = createContext<ArchiveContextType | undefined>(undefined);

export const ArchiveProvider = ({ children }: { children: React.ReactNode }) => {
  // 1. Initialize with an empty array
  const [archive, setArchive] = useState<ArchiveItem[]>([]);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  // 2. LOAD from LocalStorage on mount
  useEffect(() => {
    const savedArchive = localStorage.getItem("avre_archive_vault");
    if (savedArchive) {
      try {
        setArchive(JSON.parse(savedArchive));
      } catch (e) {
        console.error("Failed to parse archive");
      }
    }
  }, []);

  // 3. SAVE to LocalStorage whenever archive changes
  useEffect(() => {
    localStorage.setItem("avre_archive_vault", JSON.stringify(archive));
  }, [archive]);

const addToArchive = (item: ArchiveItem) => {
  if (item.isSold) {
    alert("ARCHIVE_NOTICE: This specimen has already been acquired.");
    return;
  }
  setArchive((prev) => {
    const exists = prev.find((i) => i.id === item.id);
    if (exists) return prev; 
    return [...prev, item];
  });
  setIsArchiveOpen(true);
};
  const removeFromArchive = (id: string | number) => {
    setArchive((prev) => prev.filter((item) => item.id !== id));
  };

  const clearArchive = () => {
    setArchive([]);
    localStorage.removeItem("avre_archive_vault"); // Clean up storage
  };

  const archiveTotal = useMemo(() => 
    archive.reduce((acc, item) => acc + item.price, 0), 
  [archive]);

  const archiveCount = useMemo(() => archive.length, [archive]);

  return (
    <ArchiveContext.Provider
      value={{
        archive,
        isArchiveOpen,
        addToArchive,
        removeFromArchive,
        setIsArchiveOpen,
        archiveTotal,
        archiveCount,
        clearArchive,
      }}
    >
      {children}
    </ArchiveContext.Provider>
  );
};

export const useArchive = () => {
  const context = useContext(ArchiveContext);
  if (!context) throw new Error("useArchive must be used within ArchiveProvider");
  return context;
};