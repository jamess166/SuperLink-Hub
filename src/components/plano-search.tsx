"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ExternalLink, FileText, Building, Layers, Info, Hash, User, Calendar, X, AlertCircle } from 'lucide-react';

// Define the type for a single document (plano)
interface Plano {
  id: number;
  name: string;
  bloque: string;
  nivel: string;
  especialidad: string;
  descripcion: string;
  revision: string;
  issue: string;
  updated_by: string;
  last_updated: string;
  url: string;
}

// Initialize Supabase client
const supabaseUrl = 'https://wlerywsgedivizgzvcmm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsZXJ5d3NnZWRpdml6Z3p2Y21tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNDY5OTEsImV4cCI6MjA2NzgyMjk5MX0.xbBt780R85754QXN7gsrjKOqPjMQ-VU9HmkRg2Z58Ag';
const supabase = createClient(supabaseUrl, supabaseKey);

const PlanoSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Plano[]>([]);
  const [selectedPlano, setSelectedPlano] = useState<Plano | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim().length < 3) {
      setResults([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error: supabaseError } = await supabase
        .from('documentos')
        .select('*')
        .ilike('name', `%${searchQuery}%`)
        .limit(20);

      if (supabaseError) {
        throw supabaseError;
      }

      setResults(data || []);
    } catch (err: any) {
      console.error(err);
      setError('Error al buscar los planos. Por favor, inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch(query);
    }, 500); // Debounce search to avoid too many requests

    return () => clearTimeout(debounceTimer);
  }, [query, handleSearch]);

  const detailItems = useMemo(() => {
    if (!selectedPlano) return [];
    return [
      { icon: Building, label: "Bloque", value: selectedPlano.bloque },
      { icon: Layers, label: "Nivel", value: selectedPlano.nivel },
      { icon: FileText, label: "Especialidad", value: selectedPlano.especialidad },
      { icon: Info, label: "Descripción", value: selectedPlano.descripcion, fullWidth: true },
      { icon: Hash, label: "Revisión", value: selectedPlano.revision },
      { icon: AlertCircle, label: "Issue", value: selectedPlano.issue },
      { icon: User, label: "Actualizado por", value: selectedPlano.updated_by },
      { icon: Calendar, label: "Fecha", value: new Date(selectedPlano.last_updated).toLocaleDateString() },
    ];
  }, [selectedPlano]);

  return (
     <div className="flex flex-col md:flex-row gap-6 h-full">
        <div className="flex flex-col w-full md:w-1/3 h-full">
            <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center"><Search className="mr-3" /> Buscador</CardTitle>
                    <CardDescription>Escriba el nombre o código del plano.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="search"
                        type="text"
                        placeholder="Escriba aquí para buscar..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-10 text-base"
                      />
                       {query && <X onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground" />}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2 h-5">
                        {isLoading ? 'Buscando...' : (query.length > 2 && `${results.length} resultado(s) encontrado(s)`)}
                    </p>

                    <ScrollArea className="flex-grow border rounded-md -mx-2">
                        <div className="p-2">
                        {isLoading && (
                            <div className="space-y-2">
                            {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
                            </div>
                        )}
                        {!isLoading && error && (
                            <div className="text-center py-4 text-destructive">{error}</div>
                        )}
                        {!isLoading && !error && query.length > 2 && results.length === 0 && (
                            <div className="text-center py-4 text-muted-foreground">No se encontraron resultados.</div>
                        )}
                        {!isLoading && results.map((plano) => (
                            <Button
                            key={plano.id}
                            variant="ghost"
                            onClick={() => setSelectedPlano(plano)}
                            className={`w-full justify-start text-left h-auto py-2 px-3 mb-1 ${selectedPlano?.id === plano.id ? 'bg-accent text-accent-foreground' : ''}`}
                            >
                            {plano.name}
                            </Button>
                        ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>

        <div className="w-full md:w-2/3 h-full">
             <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle>Detalles del Plano</CardTitle>
                    <CardDescription>
                        {selectedPlano ? 'Información detallada del plano seleccionado.' : 'Seleccione un plano de la lista para ver sus detalles.'}
                    </CardDescription>
                </CardHeader>
                {selectedPlano ? (
                <>
                    <ScrollArea className="flex-grow">
                        <CardContent>
                            <h3 className="font-bold text-lg text-primary mb-4">{selectedPlano.name}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                                {detailItems.map(item => (
                                    <div key={item.label} className={`flex items-start ${item.fullWidth ? 'col-span-full' : ''}`}>
                                        <item.icon className="h-4 w-4 mr-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-foreground">{item.label}</p>
                                            <p className="text-muted-foreground">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </ScrollArea>
                    <CardFooter>
                        <Button asChild className="w-full" size="lg">
                            <a href={selectedPlano.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-5 w-5" />
                            Abrir Plano
                            </a>
                        </Button>
                    </CardFooter>
                </>
                ) : (
                    <div className="flex-grow flex items-center justify-center">
                        <div className="text-center text-muted-foreground p-8">
                            <Search size={48} className="mx-auto mb-4 text-accent" />
                            <h3 className="text-xl font-semibold mb-2 text-foreground">Busca un plano</h3>
                            <p>Utiliza el panel de la izquierda para encontrar un plano por su nombre o código. Los detalles aparecerán aquí.</p>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    </div>
  );
};

export default PlanoSearch;

    