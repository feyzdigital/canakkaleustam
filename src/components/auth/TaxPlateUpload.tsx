"use client";

import { useState, useRef } from "react";
import { Upload, X, FileText, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from "@/lib/constants";

export function TaxPlateUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError(null);

    // Dosya tipi kontrolü
    if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      setError("Sadece JPG, PNG ve PDF dosyaları yüklenebilir.");
      return;
    }

    // Dosya boyutu kontrolü
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError(
        `Dosya boyutu en fazla ${MAX_FILE_SIZE / 1024 / 1024}MB olabilir.`
      );
      return;
    }

    setFile(selectedFile);

    // Görsel önizleme
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  }

  function handleRemove() {
    setFile(null);
    setPreview(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none">
        Vergi Levhası <span className="text-destructive">*</span>
      </label>

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {!file ? (
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-colors"
        >
          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            Vergi levhası görselini yüklemek için tıklayın
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            JPG, PNG veya PDF (Maks. 5MB)
          </p>
        </div>
      ) : (
        <div className="border rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Vergi levhası önizleme"
                className="w-16 h-16 object-cover rounded"
              />
            ) : (
              <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                {file.type === "application/pdf" ? (
                  <FileText className="h-8 w-8 text-muted-foreground" />
                ) : (
                  <Image className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
            )}
            <div>
              <p className="text-sm font-medium truncate max-w-[200px]">
                {file.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
