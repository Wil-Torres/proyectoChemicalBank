import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private afs: AngularFirestore) { }

  obtenerClientes() {
    return this.afs.collection('clientes').valueChanges();
  }

  obtenerCuenta(){
    return this.afs.createId().toString();
  }

  agregarCliente(obj:any){
    return this.afs.collection('clientes').add(obj);
  }

  actualizarCliente(obj:any){
    return this.afs.collection('clientes').doc(obj.id).update(obj);
  }

  agregarCuenta(clienteId:string, obj:any){
    return this.afs.collection('clientes').doc(clienteId).collection('cuentas').add(obj);
  }
  obtenerCliente(clienteId:string){
    return this.afs.collection('clientes').doc(clienteId).valueChanges();
  }

  obtenerClienteCuenta(clienteId:string){
    return this.afs.collection('clientes').doc(clienteId).collection('cuentas').valueChanges();
  }
}
