import Image from 'next/image';
import { Building, Globe } from 'lucide-react';
import LinkCard from '@/components/link-card';
import logo from './cesel_logotipo.png'
import { ThemeToggle } from '@/components/theme-toggle';
import UpdateDataDialog from '@/components/update-data-dialog';

const bim360CommonDataMainLinks = [
  //{ href: "https://docs.b360.autodesk.com/projects/5596e688-2f4f-4ad2-ac25-1c6ec598428a/folders/urn:adsk.wipprod:fs.folder:co.Vp86YoNdSCiH7ZreVxInxw", text: "Expediente Técnico Aprobado", icon: 'fileText', variant: 'default' as const },
  { href: "https://docs.b360.autodesk.com/projects/5596e688-2f4f-4ad2-ac25-1c6ec598428a/folders/urn:adsk.wipprod:fs.folder:co.1p6w6leVT7m96IJBYFEsLQ", text: "Planos de Obra Aprobados", icon: 'map', variant: 'default' as const },
  { href: "https://docs.b360.autodesk.com/projects/5596e688-2f4f-4ad2-ac25-1c6ec598428a/folders/urn:adsk.wipprod:fs.folder:co.j0g4qP6qTPOXmlAfixQNrQ/detail", text: "Modelos de Construcción", icon: 'package', variant: 'default' as const },
  { href: "https://model.b360.autodesk.com/projects/5596e688-2f4f-4ad2-ac25-1c6ec598428a/model-set/93eafa0d-3f96-405f-9484-4435d8a994e5/views", text: "Modelos de Coordinación BIM", icon: 'package', variant: 'default' as const },
] as const;

const bim360DeliverablesLinksForAccordion = [
  { href: "https://docs.b360.autodesk.com/projects/5596e688-2f4f-4ad2-ac25-1c6ec598428a/folders/urn:adsk.wipprod:fs.folder:co._bxwldVjTjCWdSr9qzq80w", text: "Entregable 04 – UT01", icon: 'fileText', variant: 'accent' as const },
  { href: "https://docs.b360.autodesk.com/projects/5596e688-2f4f-4ad2-ac25-1c6ec598428a/folders/urn:adsk.wipprod:fs.folder:co.F0oCsmu2Tbqz2K26ot7njA", text: "Entregable 06 – UT03", icon: 'fileText', variant: 'accent' as const },
  { href: "https://docs.b360.autodesk.com/projects/5596e688-2f4f-4ad2-ac25-1c6ec598428a/folders/urn:adsk.wipprod:fs.folder:co.ggfsF_I5Qu2VY_oOf8eH4g", text: "Entregable 07 – UT03", icon: 'fileText', variant: 'accent' as const },
  { href: "https://docs.b360.autodesk.com/projects/5596e688-2f4f-4ad2-ac25-1c6ec598428a/folders/urn:adsk.wipprod:fs.folder:co.2rU4r4SXSCCoHMJwnAq2_Q", text: "Entregable 08 – UT04", icon: 'fileText', variant: 'accent' as const },
] as const;

const bim360ListSheetLinksForAccordion = [
  //{ href: "...", text: "Entregable 04 – UT01", icon: 'fileText', variant: 'accent' as const },
  { href: "https://docs.b360.autodesk.com/projects/5596e688-2f4f-4ad2-ac25-1c6ec598428a/folders/urn:adsk.wipprod:fs.folder:co.F0oCsmu2Tbqz2K26ot7njA", text: "Entregable 06 – UT03", icon: 'fileText', variant: 'accent' as const },
  { href: "https://docs.b360.autodesk.com/projects/5596e688-2f4f-4ad2-ac25-1c6ec598428a/folders/urn:adsk.wipprod:fs.folder:co.ggfsF_I5Qu2VY_oOf8eH4g", text: "Entregable 07 – UT03", icon: 'fileText', variant: 'accent' as const },
  { href: "https://docs.b360.autodesk.com/projects/5596e688-2f4f-4ad2-ac25-1c6ec598428a/folders/urn:adsk.wipprod:fs.folder:co.2rU4r4SXSCCoHMJwnAq2_Q", text: "Entregable 08 – UT04", icon: 'fileText', variant: 'accent' as const },
  { href: "https://docs.b360.autodesk.com/projects/5596e688-2f4f-4ad2-ac25-1c6ec598428a/folders/urn:adsk.wipprod:fs.folder:co.OBF_Z61oQWmixn-6PW8rNA", text: "Entregable 10 – UT05", icon: 'fileText', variant: 'accent' as const },
  { href: "https://docs.b360.autodesk.com/projects/5596e688-2f4f-4ad2-ac25-1c6ec598428a/folders/urn:adsk.wipprod:fs.folder:co.ZW4EYjFATS2j-LV1PfI_Ew", text: "Entregable 11 – UT06", icon: 'fileText', variant: 'accent' as const },
  { href: "https://docs.b360.autodesk.com/projects/5596e688-2f4f-4ad2-ac25-1c6ec598428a/folders/urn:adsk.wipprod:fs.folder:co.pEgN5TLuTqG94Rdtk8PhZA", text: "Entregable 12 – UT07", icon: 'fileText', variant: 'accent' as const },] as const;

const bim360AccordionGroups = [
  {
    triggerText: "Expedientes Aprobados por Entregable",
    triggerIcon: 'folderOpen',
    links: bim360DeliverablesLinksForAccordion,
  },
  {
    triggerText: "Listado de Planos ET",
    triggerIcon: 'folderOpen',
    links: bim360ListSheetLinksForAccordion,
  },
] as const;

const ceselAccordionGroups = [
  {
    triggerText: "SharePoint – Elaboración de Documentos",
    triggerIcon: 'sharePoint',
    links: [
      { href: "https://owa.cesel.com.pe:7005/contratos/240800/Elaboracin%20de%20documentos/00.%20Doc%20SGI/2%20Obra/02.%20Control%20de%20Contrato", text: "Control de Contrato", icon: 'fileCheck', variant: 'dark' as const },
      { href: "https://owa.cesel.com.pe:7005/contratos/240800/Elaboracin%20de%20documentos/01.%20Cartas", text: "Cartas", icon: 'mail', variant: 'dark' as const },
      { href: "https://owa.cesel.com.pe:7005/contratos/240800/Elaboracin%20de%20documentos/04.%20Informes%20T%C3%A9cnicos", text: "Informes Técnicos", icon: 'fileText', variant: 'dark' as const },
      { href: "https://owa.cesel.com.pe:7005/contratos/240800/Elaboracin%20de%20documentos/03.%20Informes%20Semanales", text: "Informes Semanales", icon: 'calendarDays', variant: 'dark' as const },
      { href: "https://owa.cesel.com.pe:7005/contratos/240800/Elaboracin%20de%20documentos/06.%20Informes%20Mensuales", text: "Informes Mensuales", icon: 'calendarDays', variant: 'dark' as const },
      { href: "https://owa.cesel.com.pe:7005/contratos/240800/Elaboracin%20de%20documentos/10.%20Actas%20de%20Reuni%C3%B3n", text: "Actas de Reunión", icon: 'clipboardList', variant: 'dark' as const },
      { href: "https://owa.cesel.com.pe:7005/contratos/240800/Elaboracin%20de%20documentos/10%20Fotos", text: "Fotos", icon: 'camera', variant: 'dark' as const },
    ],
  },
  {
    triggerText: "SharePoint – Recibidos del Contratista",
    triggerIcon: 'sharePoint',
    links: [
      { href: "https://owa.cesel.com.pe:7005/contratos/240800/RecibidosDelContratista/00%20Cartas", text: "Cartas Recibidas", icon: 'mail', variant: 'dark' as const },
      { href: "https://owa.cesel.com.pe:7005/contratos/240800/RecibidosDelContratista/02%20Obra", text: "Reportes y Lookahead de Obra", icon: 'folderOpen', variant: 'dark' as const },
    ],
  },
  {
    triggerText: "SharePoint – Enviados al Contratista",
    triggerIcon: 'sharePoint',
    links: [
      { href: "https://owa.cesel.com.pe:7005/contratos/240800/EnviadosAlContratista/00%20Cartas", text: "Cartas Enviadas", icon: 'send', variant: 'dark' as const },
    ],
  },
] as const;

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="w-full flex justify-end mb-2">
            <ThemeToggle />
          </div>
          <header className="flex flex-col sm:flex-row items-center mb-6 sm:mb-8 text-center sm:text-left">
            <Image 
              src={logo} 
              alt="Logo EOPNP" 
              width={150} 
              height={72} 
              priority
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
                  links={bim360CommonDataMainLinks} 
                  accordionGroups={bim360AccordionGroups}
                  defaultButtonVariant="default" 
                >
                    {/* <Button asChild className="mb-3" size="lg" variant="accent">
                        <Link href="/search">
                            <Search className="mr-2"/>
                            Busca Planos de Obra
                        </Link>
                    </Button> */}
                </LinkCard>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-foreground/90 flex items-center">
                  <Building className="mr-3 h-7 w-7 text-accent" />
                  Entorno Cesel
                </h2>
                <LinkCard
                  accordionGroups={ceselAccordionGroups}
                  defaultButtonVariant="dark"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="text-center py-6 border-t border-border mt-auto">
        <div className="container mx-auto flex flex-col sm:flex-row justify-center items-center gap-4">
          <p className="text-sm text-muted-foreground">
            SuperLink Hub &copy; {new Date().getFullYear()} | EOPNP Supervisión
          </p>
          <UpdateDataDialog />
        </div>
      </footer>
    </div>
  );
}
