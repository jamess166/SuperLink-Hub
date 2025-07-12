
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { UploadCloud, LogIn } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: "Por favor, ingrese un email válido." }),
  password: z.string().min(1, { message: "La contraseña es obligatoria." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const authorizedUsers = {
  "sgonzales@cesel.com.pe": "Pucallpa",
  "fcabrera.ls@cesel.com.pe": "Pucallpa",
};

type AuthorizedUserEmail = keyof typeof authorizedUsers;

export default function UpdateDataDialog() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (values: LoginFormValues) => {
    const email = values.email.toLowerCase() as AuthorizedUserEmail;
    if (authorizedUsers[email] && authorizedUsers[email] === values.password) {
      setIsAuthenticated(true);
      toast({
        title: "Autenticación exitosa",
        description: "Ahora puede seleccionar un archivo para actualizar.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error de autenticación",
        description: "Email o contraseña incorrectos.",
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.name.endsWith('.xlsx')) {
        setSelectedFile(file);
      } else {
        toast({
            variant: "destructive",
            title: "Archivo no válido",
            description: "Por favor, seleccione un archivo Excel (.xlsx).",
        });
        setSelectedFile(null);
      }
    }
  };
  
  const resetState = () => {
    setIsAuthenticated(false);
    setSelectedFile(null);
    form.reset();
  }

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      // Reset state when dialog is closed
      setTimeout(resetState, 300);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Actualizar Datos</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Actualizar Datos desde Excel</DialogTitle>
          <DialogDescription>
            {isAuthenticated
              ? "Seleccione el archivo .xlsx para actualizar la base de datos."
              : "Ingrese sus credenciales para continuar."}
          </DialogDescription>
        </DialogHeader>
        
        {!isAuthenticated ? (
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...form.register('email')}
                placeholder="usuario@cesel.com.pe"
              />
              {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                {...form.register('password')}
              />
               {form.formState.errors.password && <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>}
            </div>
             <DialogFooter>
                <Button type="submit" className="w-full">
                    <LogIn className="mr-2 h-4 w-4" />
                    Ingresar
                </Button>
             </DialogFooter>
          </form>
        ) : (
          <div className="py-4 space-y-4">
            <div className="space-y-2">
                <Label htmlFor="file-upload">Archivo Excel (.xlsx)</Label>
                <Input id="file-upload" type="file" accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={handleFileChange} />
            </div>
            {selectedFile && (
                <div className="text-sm text-muted-foreground">
                    Archivo seleccionado: <strong>{selectedFile.name}</strong>
                </div>
            )}
            <DialogFooter>
                 <DialogClose asChild>
                    <Button variant="ghost">Cancelar</Button>
                </DialogClose>
                <Button onClick={() => alert(`Procesando archivo: ${selectedFile?.name}`)} disabled={!selectedFile}>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Procesar Archivo
                </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
