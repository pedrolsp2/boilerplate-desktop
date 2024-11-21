import React, { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '@/components/Table';
import { useTable } from '@/hooks/useTable';
import { TableData } from '@/components/Table/type';

type Props = {
  sk: number;
  nome: string;
  idade: number;
  endereco: string;
  cargo: string;
};

const data: Props[] = [
  {
    sk: 1,
    nome: 'João',
    idade: 20,
    endereco: 'Rua 1',
    cargo: 'Desenvolvedor',
  },
  {
    sk: 2,
    nome: 'Maria',
    idade: 25,
    endereco: 'Rua 2',
    cargo: 'Desenvolvedor',
  },
  {
    sk: 3,
    nome: 'José',
    idade: 30,
    endereco: 'Rua 3',
    cargo: 'Desenvolvedor',
  },
  {
    sk: 4,
    nome: 'Ana',
    idade: 35,
    endereco: 'Rua 4',
    cargo: 'Desenvolvedor',
  },
  {
    sk: 5,
    nome: 'Pedro',
    idade: 40,
    endereco: 'Rua 5',
    cargo: 'Desenvolvedor',
  },
  {
    sk: 6,
    nome: 'Paulo',
    idade: 45,
    endereco: 'Rua 6',
    cargo: 'Desenvolvedor',
  },
  {
    sk: 7,
    nome: 'Carlos',
    idade: 50,
    endereco: 'Rua 7',
    cargo: 'Desenvolvedor',
  },
  {
    sk: 8,
    nome: 'Joana',
    idade: 55,
    endereco: 'Rua 8',
    cargo: 'Desenvolvedor',
  },
  {
    sk: 9,
    nome: 'Mariana',
    idade: 60,
    endereco: 'Rua 9',
    cargo: 'Desenvolvedor',
  },
  {
    sk: 10,
    nome: 'Rafael',
    idade: 65,
    endereco: 'Rua 10',
    cargo: 'Desenvolvedor',
  },
];

type TableType = TableData<Props>;
const columnHelper = createColumnHelper<Props>();

const Home: React.FC = () => {
  const { selectedRows, setSelectedRows, setTable } =
    useTable<TableType>('APROVADORES_TABLE');

  const memoData = useMemo(() => data || [], [data]);
  const memoColumns = useMemo(
    () => [
      columnHelper.accessor('nome', {
        id: 'NOME',
        header: 'Nome',
        size: 400,
      }),
      columnHelper.accessor('idade', {
        id: 'IDADE',
        header: 'Idade',
        size: 400,
      }),
      columnHelper.accessor('endereco', {
        id: 'endereco',
        header: 'Endereco',
        size: 400,
      }),
      columnHelper.accessor('idade', {
        id: 'idade',
        header: 'Idade',
        size: 400,
      }),
    ],
    []
  );
  return (
    <div className="flex flex-col gap-2 ">
      <Table<TableType>
        data={memoData}
        columns={memoColumns}
        getRowId={(row) => String(row.sk)}
        getTableInstance={(table) => setTable(table)}
        persist={{
          canPersist: true,
          key: 'approvers-table',
        }}
        enableRowSelection
        tableState={{
          rowSelection: selectedRows,
        }}
        onRowSelectionChange={setSelectedRows}
      />
    </div>
  );
};

export default Home;
