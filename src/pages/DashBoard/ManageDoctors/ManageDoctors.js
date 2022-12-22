import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../../Shared/ConfirmationModal/ConfirmationModal';

const ManageDoctors = () => {
    const [deletingDoctro, setDeletingDoctro] = useState(null);
    const closeModal = () => {
        setDeletingDoctro(null);
    }

    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('https://doctors-portal-server-ten-vert.vercel.app/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {
            }
        }
    });

    const handleDeleteDoctor = (doctor) => {
        // console.log(doctor)
        fetch(`https://doctors-portal-server-ten-vert.vercel.app/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);

                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Doctor ${doctor.name} deleted Successfully`)
                }
            })
    }

    if (isLoading) {
        return <progress className="progress w-56"></progress>
    }

    return (
        <div>
            <h1>this is manage doctors page: {doctors?.length}</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avater</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialist</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, i) => <tr
                                key={doctor._id}
                            >
                                <th>{i + 1}</th>
                                <th>
                                    <div className="avatar">
                                        <div className="w-24 rounded-full">
                                            <img src={doctor.img} alt="" />
                                        </div>
                                    </div>
                                </th>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialty}</td>
                                <td>
                                    <label onClick={() => setDeletingDoctro(doctor)} htmlFor="confirm-modal" className="btn btn-ghost btn-xs">Delete</label>
                                </td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctro && <ConfirmationModal
                    title={`Are you sure you want to delete`}
                    message={`If you delete ${deletingDoctro.name}. It can't be undone`}
                    successAction={handleDeleteDoctor}
                    modalData={deletingDoctro}
                    closeModal={closeModal}

                >

                </ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;