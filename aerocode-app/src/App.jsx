import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  List, 
  FileText, 
  Settings, 
  User, 
  AlertTriangle, 
  Plus, 
  Search, 
  ArrowLeft, 
  CheckCircle, 
  Loader, 
  Circle,
  BarChart,
  HardHat,
  Users,
  Calendar,
  Building
} from 'lucide-react';

// --- Componente Principal (Gerenciador de Rotas) ---

/**
 * Componente principal da aplicação.
 * Gerencia o estado de autenticação e a página atual.
 */
export default function App() {
  // Estado para controlar qual página está sendo exibida.
  // Começa com 'login'. Outras páginas: 'dashboard', 'projetos', 'projeto-detail', 'relatorios', 'configuracoes'
  const [currentPage, setCurrentPage] = useState('login');
  
  // Estado para simular o perfil do usuário
  const [user] = useState({
    name: "Eng. Gerson",
    email: "gerson.penha@aerocode.com"
  });

  // Simula o login e navega para o dashboard
  const handleLogin = () => {
    setCurrentPage('dashboard');
  };

  // Simula o logout e volta para a tela de login
  const handleLogout = () => {
    setCurrentPage('login');
  };

  // Função de navegação principal
  const navigate = (page) => {
    setCurrentPage(page);
  };

  // Renderiza a página de login ou o layout principal
  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Renderiza o layout principal com a página de conteúdo correta
  return (
    <MainLayout user={user} currentPage={currentPage} onNavigate={navigate} onLogout={handleLogout}>
      {
        {
          'dashboard': <DashboardPage />,
          'projetos': <ProjetosPage onViewProject={() => navigate('projeto-detail')} />,
          'projeto-detail': <ProjetoDetailPage onBack={() => navigate('projetos')} />,
          'relatorios': <RelatoriosPage />,
          'configuracoes': <ConfiguracoesPage />,
          'perfil': <PerfilPage user={user} />,
        }[currentPage]
      }
    </MainLayout>
  );
}

// --- Layout Principal ---

/**
 * Estrutura principal da aplicação (Sidebar + Conteúdo)
 * @param {object} user - Objeto do usuário logado
 * @param {string} currentPage - Página atual
 * @param {function} onNavigate - Função para navegar entre páginas
 * @param {function} onLogout - Função para fazer logout
 * @param {React.ReactNode} children - Conteúdo da página a ser renderizado
 */
function MainLayout({ user, currentPage, onNavigate, onLogout, children }) {
  return (
    <div className="flex h-screen w-full bg-gray-100 font-inter">
      {/* Sidebar (Menu Lateral) */}
      <Sidebar 
        user={user}
        currentPage={currentPage} 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
      />
      
      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}

// --- Componente: Sidebar (Menu Lateral) ---

function Sidebar({ user, currentPage, onNavigate, onLogout }) {
  return (
    <aside className="w-64 flex-shrink-0 bg-white shadow-lg flex flex-col p-6">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-8">
        <div className="bg-gray-800 text-white p-3 rounded-lg">
          <HardHat size={24} />
        </div>
        <span className="text-xl font-bold text-gray-800">Aerocode</span>
      </div>

      {/* Navegação Principal */}
      <nav className="flex-1 space-y-2">
        <NavItem
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          isActive={currentPage === 'dashboard'}
          onClick={() => onNavigate('dashboard')}
        />
        <NavItem
          icon={<List size={20} />}
          label="Projetos"
          isActive={currentPage === 'projetos' || currentPage === 'projeto-detail'}
          onClick={() => onNavigate('projetos')}
        />
        <NavItem
          icon={<FileText size={20} />}
          label="Relatórios"
          isActive={currentPage === 'relatorios'}
          onClick={() => onNavigate('relatorios')}
        />
        <NavItem
          icon={<Settings size={20} />}
          label="Configurações"
          isActive={currentPage === 'configuracoes'}
          onClick={() => onNavigate('configuracoes')}
        />
      </nav>

      {/* Perfil do Usuário */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer" onClick={() => onNavigate('perfil')}>
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-sm text-gray-800">{user.name}</div>
            <div className="text-xs text-gray-500">Engenheiro</div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full mt-4 text-left text-sm text-gray-600 p-2 rounded-lg hover:bg-red-50 hover:text-red-600"
        >
          Sair (Logout)
        </button>
      </div>
    </aside>
  );
}

/**
 * Item de navegação individual na Sidebar
 */
function NavItem({ icon, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 p-3 w-full rounded-lg text-left transition-colors
        ${isActive
          ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }
      `}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}


// --- Página: Login ---

function LoginPage({ onLogin }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-inter p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gray-800 text-white p-4 rounded-xl mb-4">
            <HardHat size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Aerocode</h1>
          <p className="text-gray-500 text-sm mt-1">Sistema de Gestão de Produção</p>
        </div>

        {/* Formulário */}
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email Corporativo
            </label>
            <input
              type="email"
              id="email"
              defaultValue="gerson.penha@aerocode.com"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Senha
            </label>
            <input
              type="password"
              id="password"
              defaultValue="123456"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-colors"
          >
            Entrar
          </button>
        </form>

        {/* Links Adicionais */}
        <div className="text-center mt-4">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Esqueci minha senha
          </a>
        </div>

        {/* Divisor "OU" */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-xs font-semibold text-gray-400">OU</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Login Google */}
        <button className="w-full flex items-center justify-center p-3 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
          </svg>
          <span className="text-sm font-medium text-gray-700">Entrar com Google</span>
        </button>
      </div>
    </div>
  );
}


// --- Página: Dashboard ---

function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Painel Principal</h1>

      {/* Alertas Urgentes */}
      <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-lg shadow-md flex items-center space-x-3">
        <AlertTriangle className="text-red-600" size={24} />
        <div>
          <h3 className="font-semibold">Alerta Urgente</h3>
          <p className="text-sm">Falta de componente: **Rotor de Turbina X-15** na Linha 3.</p>
        </div>
      </div>

      {/* Cartões de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Projetos Ativos" value="8" icon={<List className="text-blue-500" />} />
        <StatCard title="Tarefas Pendentes" value="3" icon={<AlertTriangle className="text-yellow-500" />} />
        <StatCard title="Linhas de Produção" value="5" icon={<Building className="text-green-500" />} />
      </div>

      {/* Gráfico */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Visão Geral da Produção (Semanal)</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
          <BarChart size={48} />
          <span className="ml-2">Calendário react</span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
      <div className="p-3 bg-gray-100 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}


// --- Página: Projetos (Lista) ---

function ProjetosPage({ onViewProject }) {
  // Dados mockados
  const projects = [
    { id: 'Aero-X1', cliente: 'Cliente A (Boeing)', status: 'Fuselagem', prazo: '20/12/2025' },
    { id: 'Aero-X2', cliente: 'Cliente B (Airbus)', status: 'Elétrica', prazo: '15/01/2026' },
    { id: 'Sky-R3', cliente: 'Cliente C (Embraer)', status: 'Testes', prazo: '10/11/2025' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Projetos em Andamento</h1>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-colors">
          <Plus size={18} />
          <span>Novo Projeto</span>
        </button>
      </div>

      {/* Barra de Busca */}
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar projetos..."
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      {/* Tabela de Projetos */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nome do Projeto</th>
              <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cliente</th>
              <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status da Produção</th>
              <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Prazo</th>
              <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {projects.map((proj) => (
              <tr key={proj.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-800">{proj.id}</td>
                <td className="p-4 text-gray-600">{proj.cliente}</td>
                <td className="p-4 text-gray-600">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    proj.status === 'Fuselagem' ? 'bg-yellow-100 text-yellow-800' :
                    proj.status === 'Elétrica' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {proj.status}
                  </span>
                </td>
                <td className="p-4 text-gray-600">{proj.prazo}</td>
                <td className="p-4">
                  <button
                    onClick={onViewProject}
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    Ver Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// --- Página: Detalhes do Projeto ---

function ProjetoDetailPage({ onBack }) {
  return (
    <div className="space-y-6">
      {/* Cabeçalho da Página */}
      <PageHeader title="Projeto: Aero-X1" onBack={onBack} />

      {/* Abas (simuladas como seções) */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-3">Status da Montagem</h3>
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 p-4">
          <StatusStep title="Fuselagem" status="concluido" />
          <ArrowRight className="text-gray-300 hidden md:block" />
          <StatusStep title="Asas" status="andamento" />
          <ArrowRight className="text-gray-300 hidden md:block" />
          <StatusStep title="Elétrica" status="pendente" />
          <ArrowRight className="text-gray-300 hidden md:block" />
          <StatusStep title="Testes" status="pendente" />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-3">Componentes</h3>
        <p className="text-gray-600">Lista de componentes para o "Aero-X1"...</p>
        {/* Aqui entraria a lista/tabela de componentes */}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-3">Equipe</h3>
        <p className="text-gray-600">Membros da equipe alocados neste projeto...</p>
        {/* Aqui entraria a lista de membros */}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-3">Cronograma</h3>
        <p className="text-gray-600">Gráfico de Gantt ou linha do tempo...</p>
        {/* Aqui entraria o cronograma */}
      </div>
    </div>
  );
}

/**
 * Componente auxiliar para o cabeçalho de páginas internas
 */
function PageHeader({ title, onBack }) {
  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={onBack}
        className="p-2 rounded-full hover:bg-gray-200 text-gray-600 transition-colors"
      >
        <ArrowLeft size={20} />
      </button>
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
    </div>
  );
}

/**
 * Componente auxiliar para os passos de status
 */
function StatusStep({ title, status }) {
  const SvgIcon = status === 'concluido' ? CheckCircle : status === 'andamento' ? Loader : Circle;
  const colors = {
    concluido: 'bg-green-100 text-green-700 border-green-300',
    andamento: 'bg-yellow-100 text-yellow-700 border-yellow-300 animate-pulse',
    pendente: 'bg-gray-100 text-gray-500 border-gray-300',
  };

  return (
    <div className={`flex items-center space-x-2 p-4 rounded-lg border-2 ${colors[status]} w-full md:w-auto`}>
      <SvgIcon size={20} className={status === 'andamento' ? 'animate-spin' : ''} />
      <span className="font-semibold">{title}</span>
    </div>
  );
}


// --- Página: Relatórios ---

function RelatoriosPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Gerar Relatório</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <form className="space-y-6">
          {/* Tipo de Relatório */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Relatório</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                <span className="ml-2 text-gray-800">Progresso</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                <span className="ml-2 text-gray-800">Custos</span>
              </label>
            </div>
          </div>
          
          {/* Selecionar Projeto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Selecionar Projeto</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Aero-X1</option>
              <option>Aero-X2</option>
              <option>Todos os Projetos</option>
            </select>
          </div>

          {/* Período */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
            <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
              <Calendar size={32} />
              <span className="ml-2">Placeholder do "Calendário React"</span>
            </div>
          </div>

          {/* Botão de Gerar */}
          <button
            type="submit"
            onClick={(e) => e.preventDefault()}
            className="w-full bg-orange-500 text-white p-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 transition-colors"
          >
            Gerar PDF
          </button>
        </form>
      </div>
    </div>
  );
}

// --- Páginas Adicionais (Placeholder) ---

function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Configurações</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-600">Opções de configuração do sistema...</p>
      </div>
    </div>
  );
}

function PerfilPage({ user }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Perfil do Usuário</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-3xl">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="space-y-2">
          <p><strong className="text-gray-700">Cargo:</strong> Engenheiro de Produção</p>
          <p><strong className="text-gray-700">Departamento:</strong> Engenharia</p>
          <p><strong className="text-gray-700">Membro npmdesde:</strong> 2021</p>
        </div>
      </div>
    </div>
  );
}
