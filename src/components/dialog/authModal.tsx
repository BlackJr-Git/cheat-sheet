"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/auth/sign-in");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connexion requise</DialogTitle>
          <DialogDescription>
            Vous devez être connecté pour effectuer cette action.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSignIn} className="bg-violet-500 hover:bg-violet-600">
            Se connecter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
