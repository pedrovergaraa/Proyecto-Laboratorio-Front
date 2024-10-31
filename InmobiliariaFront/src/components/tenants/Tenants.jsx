import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Card from '../../shared-components/card/card';
import Table from '../../shared-components/table/Table';
import TenantsForm from '../../forms/TenantsForm/TenantsForm';
import { fetchAllTenants, createTenant, updateTenant, deleteTenant } from '../../services/TenantService';

const Tenants = () => {
  const [tenants, setTenants] = useState([]); // Estado para almacenar los inquilinos
  const [selectedTenant, setSelectedTenant] = useState(null); // Estado para almacenar el inquilino seleccionado para editar

  // Efecto para cargar los inquilinos al montar el componente
  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const data = await fetchAllTenants(); // Llamada a la API para obtener todos los inquilinos
        setTenants(data);
      } catch (error) {
        toast.error("Error al cargar los inquilinos");
      }
    };
    fetchTenants();
  }, []);

  // Manejo de la adición de un nuevo inquilino
  const handleAddTenant = async (tenant) => {
    try {
      const newTenant = await createTenant(tenant); // Llamada a la API para crear un nuevo inquilino
      setTenants([...tenants, newTenant]); // Actualiza el estado de inquilinos
      toast.success("Inquilino añadido con éxito");
    } catch (error) {
      toast.error("Error al añadir el inquilino");
    }
  };

  // Manejo de la edición de un inquilino existente
  const handleEditTenant = async (tenant) => {
    try {
      const updatedTenant = await updateTenant(tenant); // Llamada a la API para actualizar el inquilino
      setTenants(tenants.map(t => (t.id === tenant.id ? updatedTenant : t))); // Actualiza el estado de inquilinos
      toast.success("Inquilino actualizado con éxito");
    } catch (error) {
      toast.error("Error al actualizar el inquilino");
    }
  };

  // Manejo de la eliminación de un inquilino
  const handleDeleteTenant = async (id) => {
    try {
      await deleteTenant(id); // Llamada a la API para eliminar el inquilino
      setTenants(tenants.filter(tenant => tenant.id !== id)); // Actualiza el estado de inquilinos
      toast.success("Inquilino eliminado con éxito");
    } catch (error) {
      toast.error("Error al eliminar el inquilino");
    }
  };

  // Definición de las columnas para la tabla
  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Email', accessor: 'mail' },
    { Header: 'Propiedad', accessor: 'property' }, // Puedes personalizar esto según tu modelo de datos
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
          clearSelectedTenant={() => setSelectedTenant(null)} // Función para limpiar el inquilino seleccionado
        />
      )}>
        <Table columns={columns} data={tenants} /> {/* Tabla que muestra los inquilinos */}
      </Card>
      <ToastContainer /> {/* Contenedor para las notificaciones */}
    </div>
  );
};

export default Tenants;
