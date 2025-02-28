import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { checklistService } from '../../services/checklistService';
import { Checklist } from '../../types/checklist';
import { toast } from 'react-toastify';

const Checklists: React.FC = () => {
  const { user } = useAuth();
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadChecklists();
  }, []);

  const loadChecklists = async () => {
    try {
      // Por enquanto, vamos usar um ID fixo para demonstração
      const data = await checklistService.getChecklists('1');
      setChecklists(data);
    } catch (error) {
      toast.error('Erro ao carregar checklists');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateChecklistItem = async (
    checklistId: string,
    itemId: string,
    completed: boolean
  ) => {
    try {
      await checklistService.updateChecklistItem(checklistId, itemId, {
        completed,
        completedAt: completed ? new Date() : null,
      });
      toast.success('Item atualizado com sucesso!');
      loadChecklists();
    } catch (error) {
      toast.error('Erro ao atualizar item');
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Checklists</h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista de todos os checklists do projeto
          </p>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Nome
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Progresso
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Ações</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {checklists.map((checklist) => (
                    <tr key={checklist.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {checklist.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {checklist.status}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {Math.round(
                          (checklist.items.filter((item) => item.completed).length /
                            checklist.items.length) *
                            100
                        )}
                        %
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() =>
                            document
                              .getElementById(`checklist-${checklist.id}`)
                              ?.classList.remove('hidden')
                          }
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Ver detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modais de Detalhes */}
      {checklists.map((checklist) => (
        <div
          key={`modal-${checklist.id}`}
          id={`checklist-${checklist.id}`}
          className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
        >
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">{checklist.name}</h2>
              <button
                onClick={() =>
                  document
                    .getElementById(`checklist-${checklist.id}`)
                    ?.classList.add('hidden')
                }
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Fechar</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {checklist.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={(e) =>
                        handleUpdateChecklistItem(
                          checklist.id,
                          item.id,
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-sm text-gray-900">
                      {item.description}
                    </span>
                  </div>
                  {item.completed && item.completedAt && (
                    <span className="text-xs text-gray-500">
                      Concluído em{' '}
                      {new Date(item.completedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Checklists; 