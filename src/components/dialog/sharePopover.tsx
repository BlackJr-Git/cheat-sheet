"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Share } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

export default function SharePopover({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const handleWebShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          url: url,
        })
        .then(() => console.log("Partagé avec succès"))
        .catch((error) => console.error("Erreur de partage", error));
    } else {
      alert("Le partage n’est pas supporté sur cet appareil.");
    }
  };

  const [copySuccess, setCopySuccess] = useState("");

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess("Lien copié !");
      setTimeout(() => setCopySuccess(""), 2000); // Message de succès temporaire
    } catch (err) {
      setCopySuccess("Erreur lors de la copie");
    }
  };
  return (
    <Popover>
      <PopoverTrigger className="text-lg rounded-3xl border-2 px-4 py-1 flex gap-2 bg-transparent hover:bg-green-200 border-green-300 text-green-500">
        <Share />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <Button onClick={handleWebShare}> Partager via...</Button>
        <Button onClick={handleCopyClick}>
          {copySuccess ? <span>{copySuccess}</span> : "Copier le lien"}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
