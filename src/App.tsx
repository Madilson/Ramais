import { useState, useMemo, useEffect, FormEvent, MouseEvent } from 'react';
import { Search, Phone, User, Building2, X, ChevronRight, PhoneCall, Plus, Edit2, Save, Trash2, MoreVertical, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ramais as initialRamais, Ramal } from './data';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [ramaisList, setRamaisList] = useState<Ramal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRamal, setEditingRamal] = useState<Ramal | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<Ramal>({
    setor: '',
    ramal: '',
    nome: '',
    categoria: 'ADMINISTRATIVO'
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('hospital_vida_ramais');
    if (saved) {
      try {
        setRamaisList(JSON.parse(saved));
      } catch (e) {
        setRamaisList(initialRamais);
      }
    } else {
      setRamaisList(initialRamais);
    }
  }, []);

  // Save to localStorage whenever list changes
  const saveToStorage = (newList: Ramal[]) => {
    setRamaisList(newList);
    localStorage.setItem('hospital_vida_ramais', JSON.stringify(newList));
  };

  const categories = useMemo(() => {
    const cats = Array.from(new Set(ramaisList.map((r) => r.categoria)));
    return cats.sort();
  }, [ramaisList]);

  const filteredRamais = useMemo(() => {
    const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const searchLower = normalize(searchTerm);

    return ramaisList.filter((r) => {
      const matchesSearch =
        normalize(r.setor).includes(searchLower) ||
        r.ramal.includes(searchTerm) ||
        (r.nome && normalize(r.nome).includes(searchLower));
      
      const matchesCategory = selectedCategory ? r.categoria === selectedCategory : true;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, ramaisList]);

  // Group by first letter for the "Agenda" feel
  const groupedRamais = useMemo(() => {
    const sorted = [...filteredRamais].sort((a, b) => a.setor.localeCompare(b.setor));
    const groups: { [key: string]: Ramal[] } = {};
    
    // Separate favorites if no search or category filter is active
    // Or just always show them at the top if they match the filter
    const favorites = sorted.filter(r => r.isFavorite);
    const nonFavorites = sorted.filter(r => !r.isFavorite);

    if (favorites.length > 0) {
      groups['Favoritos'] = favorites;
    }

    nonFavorites.forEach(r => {
      const firstLetter = r.setor.charAt(0).toUpperCase();
      if (!groups[firstLetter]) groups[firstLetter] = [];
      groups[firstLetter].push(r);
    });
    
    return groups;
  }, [filteredRamais]);

  const toggleFavorite = (e: MouseEvent, ramal: Ramal) => {
    e.stopPropagation();
    const newList = ramaisList.map(r => 
      (r.ramal === ramal.ramal && r.setor === ramal.setor) 
        ? { ...r, isFavorite: !r.isFavorite } 
        : r
    );
    saveToStorage(newList);
  };

  const handleOpenModal = (ramal?: Ramal) => {
    if (ramal) {
      setEditingRamal(ramal);
      setFormData({ ...ramal });
    } else {
      setEditingRamal(null);
      setFormData({
        setor: '',
        ramal: '',
        nome: '',
        categoria: selectedCategory || 'ADMINISTRATIVO'
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.setor || !formData.ramal) return;

    let newList: Ramal[];
    if (editingRamal) {
      newList = ramaisList.map(r => 
        (r.ramal === editingRamal.ramal && r.setor === editingRamal.setor) ? formData : r
      );
    } else {
      newList = [formData, ...ramaisList];
    }

    saveToStorage(newList);
    setIsModalOpen(false);
  };

  const handleDelete = (ramalToDelete: Ramal) => {
    const newList = ramaisList.filter(r => 
      !(r.ramal === ramalToDelete.ramal && r.setor === ramalToDelete.setor)
    );
    saveToStorage(newList);
  };

  const handleExport = () => {
    const code = `export const ramais: Ramal[] = ${JSON.stringify(ramaisList, null, 2)};`;
    navigator.clipboard.writeText(code);
    alert('Código copiado! Cole-o aqui no chat para que eu possa atualizar o arquivo permanentemente.');
  };

  const getInitials = (text: string) => {
    return text.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 pb-24">
      {/* Header - Mobile Style */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 pt-8 pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Ramais</h1>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  className="w-full pl-11 pr-10 py-3 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-base placeholder:text-slate-400"
                  placeholder="Pesquisar por setor, nome ou ramal..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={handleExport}
                  className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                  title="Exportar dados"
                >
                  <Save className="w-6 h-6" />
                </button>
                <button
                  onClick={() => handleOpenModal()}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors hidden md:flex"
                >
                  <Plus className="w-7 h-7" />
                </button>
              </div>
            </div>
          </div>

          {/* Categories Wrapped Layout */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                  : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
              }`}
            >
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-4">
        <AnimatePresence mode="popLayout">
          {Object.keys(groupedRamais).length > 0 ? (
            Object.keys(groupedRamais).sort((a, b) => {
              if (a === 'Favoritos') return -1;
              if (b === 'Favoritos') return 1;
              return a.localeCompare(b);
            }).map(letter => (
              <div key={letter} className="mb-12">
                <div className="sticky top-[180px] md:top-[140px] bg-white py-4 z-10 flex items-center gap-2">
                  {letter === 'Favoritos' && <Star className="w-5 h-5 text-amber-400 fill-amber-400" />}
                  <h2 className={`${letter === 'Favoritos' ? 'text-amber-500' : 'text-blue-600'} font-bold text-lg border-b border-slate-50 pb-2 flex-1`}>
                    {letter}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
                  {groupedRamais[letter].map((r, idx) => (
                    <motion.div
                      key={`${r.ramal}-${r.setor}`}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group flex items-center gap-4 py-3 hover:bg-slate-50 -mx-3 px-3 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-blue-50"
                      onClick={() => handleOpenModal(r)}
                    >
                      {/* Avatar */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-sm ${
                        r.isFavorite ? 'bg-amber-400' : (idx % 3 === 0 ? 'bg-blue-400' : idx % 3 === 1 ? 'bg-emerald-400' : 'bg-indigo-400')
                      }`}>
                        {getInitials(r.setor)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                            {r.setor}
                          </h3>
                          {r.isFavorite && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{r.categoria}</span>
                          {r.nome && (
                            <>
                              <span className="w-0.5 h-0.5 bg-slate-200 rounded-full"></span>
                              <span className="text-[10px] text-slate-500 truncate">{r.nome}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => toggleFavorite(e, r)}
                          className={`p-2 rounded-full transition-colors ${r.isFavorite ? 'text-amber-400 bg-amber-50' : 'text-slate-200 hover:text-amber-400 hover:bg-amber-50'}`}
                        >
                          <Star className={`w-4 h-4 ${r.isFavorite ? 'fill-amber-400' : ''}`} />
                        </button>
                        <span className="text-base font-medium text-slate-400 group-hover:text-blue-600 transition-colors">
                          {r.ramal}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-slate-400 hidden sm:block" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center">
              <p className="text-slate-400 text-sm">Nenhum contato encontrado</p>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Action Button (Mobile Feel) */}
      <button
        onClick={() => handleOpenModal()}
        className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 text-white rounded-full shadow-xl shadow-blue-200 flex items-center justify-center hover:scale-110 transition-transform active:scale-95 z-40"
      >
        <Plus className="w-8 h-8" />
      </button>

      {/* Modal - Contact Card Style */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl w-full max-w-md relative z-10 overflow-hidden"
            >
              <div className="p-6 flex justify-between items-center border-b border-slate-50">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-blue-600 font-medium text-sm"
                >
                  Cancelar
                </button>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingRamal ? 'Detalhes' : 'Novo Contato'}
                </h2>
                <button 
                  onClick={handleSave}
                  className="text-blue-600 font-bold text-sm"
                >
                  Salvar
                </button>
              </div>
              
              <div className="p-8">
                {/* Large Avatar in Modal */}
                <div className="flex flex-col items-center mb-8 relative">
                  {editingRamal && (
                    <button
                      onClick={(e) => {
                        const updated = { ...formData, isFavorite: !formData.isFavorite };
                        setFormData(updated);
                      }}
                      className={`absolute top-0 right-0 p-3 rounded-full transition-all ${formData.isFavorite ? 'bg-amber-50 text-amber-400' : 'bg-slate-50 text-slate-300'}`}
                    >
                      <Star className={`w-6 h-6 ${formData.isFavorite ? 'fill-amber-400' : ''}`} />
                    </button>
                  )}
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-4">
                    {formData.setor ? (
                      <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                        {getInitials(formData.setor)}
                      </div>
                    ) : (
                      <User className="w-12 h-12" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{formData.setor || 'Novo Contato'}</h3>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                  <div className="bg-slate-50 rounded-2xl p-4 space-y-4">
                    <div className="flex items-center gap-4">
                      <Building2 className="w-5 h-5 text-slate-400" />
                      <input
                        required
                        type="text"
                        className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-slate-300"
                        placeholder="Setor"
                        value={formData.setor}
                        onChange={(e) => setFormData({ ...formData, setor: e.target.value })}
                      />
                    </div>
                    <div className="h-px bg-slate-100 ml-9" />
                    <div className="flex items-center gap-4">
                      <User className="w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-slate-300"
                        placeholder="Nome do Responsável"
                        value={formData.nome || ''}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 space-y-4">
                    <div className="flex items-center gap-4">
                      <Phone className="w-5 h-5 text-slate-400" />
                      <input
                        required
                        type="text"
                        className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-slate-300"
                        placeholder="Ramal"
                        value={formData.ramal}
                        onChange={(e) => setFormData({ ...formData, ramal: e.target.value })}
                      />
                    </div>
                    <div className="h-px bg-slate-100 ml-9" />
                    <div className="flex items-center gap-4">
                      <MoreVertical className="w-5 h-5 text-slate-400" />
                      <select
                        className="flex-1 bg-transparent border-none outline-none text-sm appearance-none"
                        value={formData.categoria}
                        onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                      >
                        {categories.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {editingRamal && (
                    <button
                      type="button"
                      onClick={() => {
                        if(confirm('Excluir este contato?')) {
                          handleDelete(editingRamal);
                          setIsModalOpen(false);
                        }
                      }}
                      className="w-full py-4 text-red-500 font-bold text-sm bg-red-50 rounded-2xl hover:bg-red-100 transition-colors"
                    >
                      Excluir Contato
                    </button>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
