// Componente Tenants.jsx
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Card from '../../shared-components/card/card';
import Table from '../../shared-components/table/Table';
import TenantsForm from '../../forms/TenantsForm/TenantsForm';
import { fetchAllTenants, createTenant, updateTenant, deleteTenant } from '../../services/TenantService';

const Tenants = () => {
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const data = await fetchAllTenants();
        setTenants(data);
      } catch (error) {
        toast.error("Error al cargar los inquilinos");
      }
    };
    fetchTenants();
  }, []);

  const handleAddTenant = async (tenant) => {
    try {
      const newTenant = await createTenant(tenant);
      setTenants([...tenants, newTenant]);
      toast.success("Inquilino añadido con éxito");
    } catch (error) {
      toast.error("Error al añadir el inquilino");
    }
  };

  const handleEditTenant = async (tenant) => {
    if (!tenant.id) {
      toast.error("Inquilino no válido para edición");
      return;
    }
    try {
      const updatedTenant = await updateTenant(tenant);
      setTenants(tenants.map(t => (t.id === tenant.id ? updatedTenant : t)));
      toast.success("Inquilino actualizado con éxito");
    } catch (error) {
      toast.error("Error al actualizar el inquilino");
    }
  };

  const handleDeleteTenant = async (id) => {
    try {
      await deleteTenant(id);
      setTenants(tenants.filter(tenant => tenant.id !== id));
      toast.success("Inquilino eliminado con éxito");
    } catch (error) {
      toast.error("Error al eliminar el inquilino");
    }
  };

  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Email', accessor: 'mail' },
    { Header: 'Propiedad', accessor: 'property' },
    {
      Header: 'Acciones',
      Cell: ({ row }) => (
        <>
          <button onClick={() => setSelectedTenant(row.original)}>Editar</button>
          <button onClick={() => handleDeleteTenant(row.original.id)}>Eliminar</button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Card title="Inquilinos" FormComponent={() => (
        <TenantsForm 
          onAdd={handleAddTenant} 
          onEdit={handleEditTenant} 
          selectedTenant={selectedTenant} 
          clearSelectedTenant={() => setSelectedTenant(null)} 
        />
      )}>
        <Table columns={columns} data={tenants} />
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Tenants;
