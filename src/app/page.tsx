import Image from 'next/image';
import { Globe, Building, FileText, Map, Package, CheckSquare, FolderOpen, CalendarDays } from 'lucide-react';
import LinkCard from '@/components/link-card';
import logo from './cesel_logotipo.png'
import { ThemeToggle } from '@/components/theme-toggle';

const bim360CommonDataMainLinks = [
  //{ href: "https://docs.b360.autodesk.com/projects/5596e688-2f4f-4ad2-ac25-1c6ec598428a/folders/urn:adsk.wipprod:fs.folder:co.Vp86YoNdSCiH7ZreVxInxw", text: "Expediente Técnico Aprobado", icon: FileText, variant: 'default' as const },
  { href: "https://docs.b360.autodesk.com/projects/5596e688-2f4f-4ad2-ac25-1c6ec598428a/folders/urn:adsk.wipprod:fs.folder:co.1p6w6leVT7m96IJBYFEsLQ", text: "Planos de Obra Aprobados", icon: Map, variant: 'default' as const },
  { href: "https://model.b360.autodesk.com/projects/5596e688-2f4f-4ad2-ac25-1c6ec598428a/model-set/93eafa0d-3f96-405f-9484-4435d8a994e5/views", text: "Modelos de Coordinación BIM", icon: Package, variant: 'default' as const },
];

const bim360DeliverablesLinksForAccordion = [
  { href: "https://docs.b360.autodesk.com/projects/5596e688-2f4f-4ad2-ac25-1c6ec598428a/folders/urn:adsk.wipprod:fs.folder:co._bxwldVjTjCWdSr9qzq80w", text: "Entregable 04 – UT01", icon: FileText, variant: 'accent' as const },
  { href: "https://docs.b360.autodesk.com/projects/5596e688-2f4f-4ad2-ac25-1c6ec598428a/folders/urn:adsk.wipprod:fs.folder:co.F0oCsmu2Tbqz2K26ot7njA", text: "Entregable 06 – UT03", icon: FileText, variant: 'accent' as const },
  { href: "https://docs.b360.autodesk.com/projects/5596e688-2f4f-4ad2-ac25-1c6ec598428a/folders/urn:adsk.wipprod:fs.folder:co.ggfsF_I5Qu2VY_oOf8eH4g", text: "Entregable 07 – UT03", icon: FileText, variant: 'accent' as const },
  { href: "https://docs.b360.autodesk.com/projects/5596e688-2f4f-4ad2-ac25-1c6ec598428a/folders/urn:adsk.wipprod:fs.folder:co.2rU4r4SXSCCoHMJwnAq2_Q", text: "Entregable 08 – UT04", icon: FileText, variant: 'accent' as const },
];

const bim360AccordionGroup = [
  {
    triggerText: "Expedientes Aprobados por Entregable",
    triggerIcon: FolderOpen,
    links: bim360DeliverablesLinksForAccordion,
    // triggerVariant: 'secondary' // Opcional: para dar un estilo específico al trigger si fuera un botón
  }
];

const ceselEnvironmentLinks = [
  { href: "https://lookerstudio.google.com/u/0/reporting/aa27f779-df43-420a-a150-9d3efd50ff5a/page/1wkLF?s=l0t3feifGkE", text: "Validación Planos Aprobados", icon: CheckSquare, variant: 'dark' as const },
  { href: "https://owa.cesel.com.pe:7005/contratos/240800/default.aspx", text: "SharedPoint Proyecto", icon: FolderOpen, variant: 'dark' as const },
  { href: "https://owa.cesel.com.pe:7005/contratos/240800/Elaboracin%20de%20documentos/03.%20Informes%20Semanales", text: "Informes Semanales", icon: CalendarDays, variant: 'dark' as const },
  { href: "https://owa.cesel.com.pe:7005/contratos/240800/Elaboracin%20de%20documentos/06.%20Informes%20Mensuales", text: "Informes Mensuales", icon: CalendarDays, variant: 'dark' as const },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="w-full flex justify-end mb-4">
            <ThemeToggle />
          </div>
          <header className="flex flex-col sm:flex-row items-center mb-6 sm:mb-8 text-center sm:text-left">
            <Image 
              src={logo} 
              alt="Logo EOPNP" 
              width={150} 
              height={72} 
              className="mr-0 sm:mr-5 mb-4 sm:mb-0 rounded-lg"
              data-ai-hint="company emblem"
            />
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-primary">
                EOPNP - SUPERVISIÓN
              </h1>
              <p className="text-lg text-muted-foreground mt-1">Panel Central de Enlaces del Proyecto</p>
            </div>
          </header>

          <section className="mb-10">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-foreground/90 flex items-center">
                  <Globe className="mr-3 h-7 w-7 text-accent" />
                  BIM 360
                </h2>
                <LinkCard 
                  // title="Entorno Común de Datos" 
                  links={bim360CommonDataMainLinks} 
                  accordionGroups={bim360AccordionGroup}
                  defaultButtonVariant="default" 
                />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-foreground/90 flex items-center">
                  <Building className="mr-3 h-7 w-7 text-accent" />
                  Entorno Cesel
                </h2>
                <LinkCard 
                  links={ceselEnvironmentLinks} 
                  defaultButtonVariant="dark" 
                />
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="text-center py-6 border-t border-border mt-auto">
        <p className="text-sm text-muted-foreground">
          SuperLink Hub &copy; {new Date().getFullYear()} | EOPNP Supervisión
        </p>
      </footer>
    </div>
  );
}