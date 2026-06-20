import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Upload, Trash2, Loader2 } from "lucide-react";
import { useRef, useState } from "react";

export function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  
  const uploadMutation = trpc.files.upload.useMutation();
  const listQuery = trpc.files.list.useQuery();
  const deleteMutation = trpc.files.delete.useMutation();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = (e.target?.result as string).split(',')[1];
        
        await uploadMutation.mutateAsync({
          fileName: file.name,
          fileData: base64,
          mimeType: file.type,
        });

        await listQuery.refetch();
        
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileId: number) => {
    try {
      await deleteMutation.mutateAsync({ fileId });
      await listQuery.refetch();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Upload Files</h3>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition cursor-pointer"
               onClick={() => fileInputRef.current?.click()}>
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-600">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
            accept="image/*"
          />

          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Select File
              </>
            )}
          </Button>
        </div>
      </Card>

      {listQuery.data && listQuery.data.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Your Files</h3>
          <div className="space-y-2">
            {listQuery.data.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">{file.fileName}</p>
                  <p className="text-xs text-gray-500">
                    {(file.fileSize || 0) / 1024 > 1024
                      ? `${((file.fileSize || 0) / 1024 / 1024).toFixed(2)} MB`
                      : `${((file.fileSize || 0) / 1024).toFixed(2)} KB`}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(file.id)}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
