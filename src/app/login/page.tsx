
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Fuel, 
  User, 
  Store, 
  Building2, 
  ShieldCheck, 
  ArrowRight,
  LayoutDashboard
} from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const roles = [
    {
      title: "Área do Cliente",
      description: "App mobile para motoristas buscarem postos e economizarem.",
      icon: User,
      href: "/",
      color: "bg-blue-500",
      badge: "Mobile App"
    },
    {
      title: "Sistema do Frentista",
      description: "Interface ágil para validação de códigos e abastecimento na pista.",
      icon: Fuel,
      href: "/frentista",
      color: "bg-orange-500",
      badge: "Operacional"
    },
    {
      title: "Gestão do Posto",
      description: "Painel estratégico para donos e gerentes de postos parceiros.",
      icon: Store,
      href: "/admin-posto",
      color: "bg-purple-600",
      badge: "B2B Dashboard"
    },
    {
      title: "Portal da Empresa",
      description: "Gestão de vale-combustível e colaboradores para empresas (RH/Frotas).",
      icon: Building2,
      href: "/admin-empresa",
      color: "bg-emerald-600",
      badge: "Corporate"
    },
    {
      title: "Admin Master (SaaS)",
      description: "Controle total da plataforma, postos, empresas e métricas globais.",
      icon: ShieldCheck,
      href: "/admin",
      color: "bg-slate-900",
      badge: "Master Admin"
    }
  ]

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary rounded-[2rem] shadow-2xl shadow-primary/20">
              <Fuel className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-headline font-bold text-slate-800 tracking-tight">Tá no Posto</h1>
          <p className="text-slate-500 font-medium max-w-md mx-auto">
            Selecione o módulo que deseja acessar para testar as funcionalidades do protótipo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, i) => (
            <Link key={i} href={role.href}>
              <Card className="h-full border-none shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] group cursor-pointer bg-white overflow-hidden flex flex-col">
                <div className={`${role.color} h-2 w-full`} />
                <CardHeader className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl ${role.color} text-white shadow-lg`}>
                      <role.icon className="w-6 h-6" />
                    </div>
                    <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest border-slate-200">
                      {role.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors">
                    {role.title}
                  </CardTitle>
                  <CardDescription className="text-xs leading-relaxed mt-2">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0 mt-auto">
                  <div className="flex items-center text-xs font-bold text-slate-400 group-hover:text-primary uppercase tracking-widest transition-colors">
                    Acessar Módulo <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <footer className="text-center pt-8">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
            Protótipo Tá no Posto • Sistema de Fidelidade e Benefícios
          </p>
        </footer>
      </div>
    </main>
  )
}
