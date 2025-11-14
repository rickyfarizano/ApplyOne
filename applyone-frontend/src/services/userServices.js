import api from "./api";
import axios from "axios";

/**
 * Realiza una peticion a la api para obtener todos los usuarios registrados en la base de datos
 */
export const getAllUsers = async () => {
    const response = await axios.get('/users/get-all-users')
    return response.data
}

/**
 * Realiza una peticion a la api para obtener un usuario especifico
 * registrado en la base de datos
 * @param userId numero identificador unico del usuario
 */
export const getUserById = async (userId) => {
    const response = await axios.get(`/users/get-user-by-id/${userId}`)
    return response.data
}

/**
 * Le pide a la api registrar un nuevo usuario en la base de datos
 * en base a informacion del ususario que se esta intentando crear
 * @param {Object} userData objeto que contiene los datos del usuario a registrar
 */
export const registerUser = async (userData) => {
    const response = await axios.post(`/users/register-user`, userData)
    return response.data
}

/**
 * Realiza una peticion a la api solicitando actualizar los datos 
 * de un usuario en concreto
 * @param userId identificador unico del usuario a actualizar
 * @param {Object} userData objeto que contiene los datos del usuario a actualizar
 */
export const updateUser = async (userId, userData) => {
    const response = await axios.patch(`/users/edit-user/${userId}`, userData)
    return response.data
}

/**
 * Realiza una peticion a la api solicitando la eliminacion de un usuario en concreto
 */
export const deleteUser = async (userId) => {
    const response = await axios.delete(`/users/delete-user/${userId}`)
    return response.data
}