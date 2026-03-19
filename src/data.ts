export interface Ramal {
  setor: string;
  ramal: string;
  nome?: string;
  categoria: string;
  isFavorite?: boolean;
}

export const ramais: Ramal[] = [
  // ADMINISTRATIVO
  { categoria: "ADMINISTRATIVO", setor: "Contabilidade", ramal: "9807" },
  { categoria: "ADMINISTRATIVO", setor: "Financeiro", ramal: "9712", nome: "BRUNO" },
  { categoria: "ADMINISTRATIVO", setor: "Rec. de Glosas/Contas a Receber", ramal: "9710" },
  { categoria: "ADMINISTRATIVO", setor: "Cobrança", ramal: "9711" },
  { categoria: "ADMINISTRATIVO", setor: "Gestão de Negócios Prestadores", ramal: "9788" },
  { categoria: "ADMINISTRATIVO", setor: "Faturamento Convênio", ramal: "9703" },
  { categoria: "ADMINISTRATIVO", setor: "Auditoria Externa", ramal: "9786" },
  { categoria: "ADMINISTRATIVO", setor: "Coord. Fat. Convênio", ramal: "9705" },
  { categoria: "ADMINISTRATIVO", setor: "Faturamento SUS", ramal: "9704", nome: "LIGIA" },
  { categoria: "ADMINISTRATIVO", setor: "Same", ramal: "9785" },
  { categoria: "ADMINISTRATIVO", setor: "Recrutamento e Seleção", ramal: "9789" },
  { categoria: "ADMINISTRATIVO", setor: "Departamento Pessoal", ramal: "9706" },
  { categoria: "ADMINISTRATIVO", setor: "Coord. Gestão de Pessoas", ramal: "9767" },
  { categoria: "ADMINISTRATIVO", setor: "Marketing - Comunicação", ramal: "9837" },
  { categoria: "ADMINISTRATIVO", setor: "Central de Agendamento", ramal: "9700" },
  { categoria: "ADMINISTRATIVO", setor: "Ouvidoria", ramal: "9727" },

  // CENTRO CIRÚRGICO
  { categoria: "CENTRO CIRÚRGICO", setor: "Esterilização / CME", ramal: "9730" },
  { categoria: "CENTRO CIRÚRGICO", setor: "RPA - sala de recuperação", ramal: "9757" },
  { categoria: "CENTRO CIRÚRGICO", setor: "Sala - Enfermeira", ramal: "9765", nome: "CLARIZA/JAMYLLE" },
  { categoria: "CENTRO CIRÚRGICO", setor: "Auditoria CC", ramal: "9759", nome: "SILVANA" },
  { categoria: "CENTRO CIRÚRGICO", setor: "Secretaria (ligação externa)", ramal: "9718", nome: "HANNA" },
  { categoria: "CENTRO CIRÚRGICO", setor: "Secretaria (ligação interna)", ramal: "9843", nome: "BARBARA" },

  // CENTRO DE ESPECIALIDADES MÉDICAS
  { categoria: "CENTRO DE ESPECIALIDADES MÉDICAS", setor: "Recepção", ramal: "9752/9763", nome: "CEM" },

  // COREME / TRANSPLANTE
  { categoria: "COREME / TRANSPLANTE", setor: "Sala", ramal: "9780" },

  // CONTROLE DE QUALIDADE
  { categoria: "CONTROLE DE QUALIDADE", setor: "Tratamento de Água", ramal: "9806" },

  // DIRETORIA
  { categoria: "DIRETORIA", setor: "Direção administrativa", ramal: "9719", nome: "ELIANA" },
  { categoria: "DIRETORIA", setor: "Direção técnica", ramal: "9720", nome: "DR MIGUEL" },
  { categoria: "DIRETORIA", setor: "Direção médica", ramal: "9721", nome: "RODRIGO" },
  { categoria: "DIRETORIA", setor: "Coord. de Transplante", ramal: "9774" },
  { categoria: "DIRETORIA", setor: "Secretária", ramal: "9707", nome: "WILIANE" },

  // FARMÁCIA
  { categoria: "FARMÁCIA", setor: "Coord. Farmácia/suprimentos", ramal: "9722", nome: "STEPHANIE" },
  { categoria: "FARMÁCIA", setor: "Farmácia Satélite", ramal: "9758", nome: "KARINE" },
  { categoria: "FARMÁCIA", setor: "Farmácia de Produção", ramal: "9842" },
  { categoria: "FARMÁCIA", setor: "Farmácia SUS", ramal: "9838" },

  // HEMODIÁLISE SUS
  { categoria: "HEMODIÁLISE SUS", setor: "Sala Branca I", ramal: "9724" },
  { categoria: "HEMODIÁLISE SUS", setor: "Burocrata HD", ramal: "9841" },
  { categoria: "HEMODIÁLISE SUS", setor: "Sala Branca II", ramal: "9725" },
  { categoria: "HEMODIÁLISE SUS", setor: "Sala de digitação", ramal: "9726" },

  // HEMODIÁLISE - RENAL PREMIUM
  { categoria: "HEMODIÁLISE - RENAL PREMIUM", setor: "Posto de Enf. (anexo)", ramal: "9812" },
  { categoria: "HEMODIÁLISE - RENAL PREMIUM", setor: "Posto de Enf.", ramal: "9811" },

  // HEMODINÂMICA
  { categoria: "HEMODINÂMICA", setor: "Posto de Enfermagem", ramal: "9829" },
  { categoria: "HEMODINÂMICA", setor: "Sala de comando", ramal: "9802" },

  // HOTELARIA
  { categoria: "HOTELARIA", setor: "Coordenação Hotelaria", ramal: "9733" },
  { categoria: "HOTELARIA", setor: "Higienização", ramal: "9768" },
  { categoria: "HOTELARIA", setor: "Rouparia", ramal: "9828" },

  // INTERNAMENTO
  { categoria: "INTERNAMENTO", setor: "Coord. de Enfermagem", ramal: "9803", nome: "SILZI" },
  { categoria: "INTERNAMENTO", setor: "Secretaria - Posto IV / UTI SUS", ramal: "9783" },
  { categoria: "INTERNAMENTO", setor: "Secretaria - Aptos", ramal: "9804", nome: "KELLY/CAMILA" },
  { categoria: "INTERNAMENTO", setor: "Quarto Médicos", ramal: "9808" },
  { categoria: "INTERNAMENTO", setor: "Posto II - Cirúrgico", ramal: "9731" },
  { categoria: "INTERNAMENTO", setor: "Posto III - Clínico", ramal: "9728" },
  { categoria: "INTERNAMENTO", setor: "Posto IV - Clínico", ramal: "9735" },

  // MANUTENÇÃO
  { categoria: "MANUTENÇÃO", setor: "Coord. de Manutenção", ramal: "9737" },
  { categoria: "MANUTENÇÃO", setor: "Oficina", ramal: "9738" },

  // LABVIDA
  { categoria: "LABVIDA", setor: "Recepção", ramal: "9736" },
  { categoria: "LABVIDA", setor: "Área Técnica", ramal: "9836" },

  // NUTRIÇÃO
  { categoria: "NUTRIÇÃO", setor: "Nutrição/Produção", ramal: "9739" },
  { categoria: "NUTRIÇÃO", setor: "Nutrição/Clínica", ramal: "9755" },
  { categoria: "NUTRIÇÃO", setor: "Copa/Cozinha", ramal: "9832", nome: "LANE" },

  // ONCOLOGIA
  { categoria: "ONCOLOGIA", setor: "Recepção", ramal: "9844" },

  // PORTARIA
  { categoria: "PORTARIA", setor: "Portaria Colaborador", ramal: "9847" },

  // PRONTO ATENDIMENTO
  { categoria: "PRONTO ATENDIMENTO", setor: "Recepção", ramal: "9723/9741" },
  { categoria: "PRONTO ATENDIMENTO", setor: "Farmácia", ramal: "9744" },
  { categoria: "PRONTO ATENDIMENTO", setor: "Sala de Laudos", ramal: "9751" },
  { categoria: "PRONTO ATENDIMENTO", setor: "Descanso de Colab.", ramal: "9750" },

  // OUTROS / PEQUENOS PROCEDIMENTOS
  { categoria: "PRONTO ATENDIMENTO", setor: "Pequenos Procedimentos", ramal: "9753" },
  { categoria: "PRONTO ATENDIMENTO", setor: "Ortopedia", ramal: "9754" },
  { categoria: "PRONTO ATENDIMENTO", setor: "Posto de Enfermagem", ramal: "9761" },
  { categoria: "PRONTO ATENDIMENTO", setor: "Consultório 01", ramal: "9742" },
  { categoria: "PRONTO ATENDIMENTO", setor: "Consultório 02", ramal: "9764" },
  { categoria: "PRONTO ATENDIMENTO", setor: "Classificação de Risco", ramal: "9762", nome: "HEVIA/NAYARA/DALIANE" },

  // RECEPÇÃO DE PRONTUÁRIOS
  { categoria: "RECEPÇÃO DE PRONTUÁRIOS", setor: "Sala", ramal: "9840" },

  // RECEPÇÃO DE
  { categoria: "RECEPÇÃO DE", setor: "Serviço social", ramal: "9769" },
  { categoria: "RECEPÇÃO DE", setor: "Psicologia", ramal: "9770" },
  { categoria: "RECEPÇÃO DE", setor: "Recepção", ramal: "9701/9773" },

  // RECEPÇÃO DE CONVÊNIOS E PARTICULARES
  { categoria: "RECEPÇÃO DE CONVÊNIOS E PARTICULARES", setor: "Recepção", ramal: "9772/9732" },
  { categoria: "RECEPÇÃO DE CONVÊNIOS E PARTICULARES", setor: "Autorizações", ramal: "9740" },
  { categoria: "RECEPÇÃO DE CONVÊNIOS E PARTICULARES", setor: "Caixa", ramal: "9771" },

  // REFEITÓRIO DOS COLABORADORES
  { categoria: "REFEITÓRIO DOS COLABORADORES", setor: "Sala", ramal: "9835" },

  // SUPRIMENTOS
  { categoria: "SUPRIMENTOS", setor: "Sup. de suprimentos", ramal: "9833" },
  { categoria: "SUPRIMENTOS", setor: "Almoxarifado", ramal: "9745" },
  { categoria: "SUPRIMENTOS", setor: "Compras 01", ramal: "9746" },
  { categoria: "SUPRIMENTOS", setor: "Compras 02", ramal: "9747" },
  { categoria: "SUPRIMENTOS", setor: "OPME", ramal: "9743" },

  // TI
  { categoria: "TI", setor: "Suporte SMART", ramal: "9748/9760" },
  { categoria: "TI", setor: "TI", ramal: "9784" },

  // UTI GERAL
  { categoria: "UTI GERAL", setor: "Posto 01", ramal: "9777" },
  { categoria: "UTI GERAL", setor: "Posto 02", ramal: "9729" },
  { categoria: "UTI GERAL", setor: "Posto 03", ramal: "9779" },
  { categoria: "UTI GERAL", setor: "Quarto Médicos", ramal: "9813" },
  { categoria: "UTI GERAL", setor: "Secretaria", ramal: "9749" },

  // POSTO I / UTI SUS
  { categoria: "POSTO I / UTI SUS", setor: "Posto de Enfermagem", ramal: "9775" },

  // VIMAGEM
  { categoria: "VIMAGEM", setor: "Recepção", ramal: "9776" },
  { categoria: "VIMAGEM", setor: "Tomografia", ramal: "9839" },
  { categoria: "VIMAGEM", setor: "Administrativo", ramal: "9851" },

  // MEDNUTRO
  { categoria: "MEDNUTRO", setor: "Administrativo", ramal: "9809" },
];
