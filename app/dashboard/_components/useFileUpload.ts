"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

/** The three-step Convex upload flow, wrapped as one call: mint a URL, POST the file, return the storage id. */
export function useFileUpload() {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  return async function uploadFile(file: File): Promise<Id<"_storage">> {
    const uploadUrl = await generateUploadUrl();
    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });
    if (!result.ok) {
      throw new Error(`Upload failed with status ${result.status}`);
    }
    const { storageId } = (await result.json()) as { storageId: Id<"_storage"> };
    return storageId;
  };
}
