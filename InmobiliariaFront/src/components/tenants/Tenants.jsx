import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Card from '../../shared-components/card/Card';
import Table from '../../shared-components/table/Table';
import TenantsForm from '../../forms/TenantsForm/TenantsForm';
import { fetchAllTenants, createTenant, updateTenant, deleteTenant } from '../../services/TenantService';

const Tenants = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const data = await fetchAllTenants();
        setTenants(data);
      } catch (error) {
        setError("Error fetching tenants");
        toast.error("Error al cargar los inquilinos");
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  const addTenant = async (tenant) => {
    try {
      const newTenant = await createTenant(tenant);
      setTenants((prev) => [...prev, newTenant]);
      toast.success("Inquilino añadido con éxito");
    } catch (error) {
      console.error("Error adding tenant:", error);
      toast.error("Error al añadir el inquilino");
    }
  };

  const editTenant = async (updatedTenant) => {
    try {
      await updateTenant(updatedTenant);
      setTenants((prev) =>
        prev.map((tenant) =>
          tenant.id === updatedTenant.id ? updatedTenant : tenant
        )
      );
      toast.success("Inquilino actualizado con éxito");
    } catch (error) {
      console.error("Error editing tenant:", error);
      toast.error("Error al actualizar el inquilino");
    }
  };

  const removeTenant = async (id) => {
    try {
      await deleteTenant(id);  
      setTenants((prev) => prev.filter((tenant) => tenant.id !== id));  
      toast.success("Inquilino eliminado con éxito");
    } catch (error) {
      console.error("Error deleting tenant:", error);
      toast.error("Error al eliminar el inquilino");
    }
  };
  

  const columns = [
    { Header: 'Nombre', accessor: 'name' },
    { Header: 'Email', accessor: 'mail' },
  ];

  return (
    <div>
      <Card 
        title="Inquilinos" 
        FormComponent={() => <TenantsForm onAdd={addTenant} />} 
      >
        {loading ? (
          <p>Cargando inquilinos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : tenants.length > 0 ? (
          <Table
          columns={columns}
          data={tenants}  
          onEdit={editTenant}  
          onDelete={removeTenant}  
          />
        ) : (
          <p>No hay datos disponibles</p>
        )}
      </Card>
      <ToastContainer /> 
    </div>
  );
};

export default Tenants;
