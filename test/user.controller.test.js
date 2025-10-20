
const Boo = require('../models/Boo'); 

jest.mock('../models/Boo', () => ({ 
    // Solo necesitamos mockear la función 'create'
    create: jest.fn(),
}));

// Importa solo la función de creación (POST) con la extensión .js.
const { createUser } = require('../controllers/user.controller.js');
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

// Limpia todos los mocks antes de cada prueba
beforeEach(() => {
    jest.clearAllMocks();
});
describe('createUser', () => {
    let res;

    beforeEach(() => {
        res = mockResponse(); 
    });

    // PRUEBA: Creación exitosa (Estatus 201)
    it('debe crear un usuasio de la manera correct ', async () => {
        // ARRANGE: Simula una petición POST con todos los datos
        const req = { body: { usuario: 'pancha', nombre: 'miji', apellido: 'Perez' } };
        const nuevoUsuarioMock = req.body; 
        
        // Simula el éxito de la creación en la base de datos
        Boo.create.mockResolvedValue(nuevoUsuarioMock);

        // ACT: Llama a la función a probar
        await createUser(req, res);

        // ASSERT: Verifica que el controlador hizo lo correcto
        expect(Boo.create).toHaveBeenCalledWith(req.body); 
        expect(res.status).toHaveBeenCalledWith(201); // Verifica el éxito del POST
        expect(res.json).toHaveBeenCalledWith(nuevoUsuarioMock);
    });
});