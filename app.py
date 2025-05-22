from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from bson.objectid import ObjectId

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

cliente = MongoClient("mongodb://mongodb:27017")
db = cliente["eventos_db"]
coleccion = db ["eventos"]

@app.get("/eventos")
async def obtener_eventos():
    eventos =[]
    for eventos in coleccion.find():
        eventos["_id"] = str(eventos["id"])
        eventos.append(eventos)
    return eventos

@app.put("/eventos/{eventos_id}")
async def editar_evetos(eventos_id: str, nombre: str, fecha:str, lugar:str):
    resultado = coleccion.update_one(
        {"_id": ObjectId(eventos_id)},
        {"$set":{"nombre":nombre, "fecha":fecha, "lugar":lugar}}
    )
    if resultado.matched_count ==0:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return{"estado":"actualizado"}

@app.delete("/eventos/{eventos_id}")
async def eliminar_evento(evento_id: str):
    resultado = coleccion.delete_one({"id":ObjectId(evento_id)})
    if resultado.deleted_count ==0:
     raise HTTPException(status_code=404, detail="Evento no encontrado")
    return{"estado":"eliminado"}

@app.post("/eventos")
async def crear_evento(nombre: str, fecha: str, lugar: str):
    evento ={"nombre":nombre, "fecha": fecha, "lugar":lugar}
    resultado = coleccion.insert_one(evento)
    evento["_id"] = str(resultado.inserted_id)
    return evento