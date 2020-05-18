import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private afs: AngularFirestore) { }

  obtenerCuenta(){
    return this.afs.createId().toString();
  }

  agregarCliente(obj:any){
    return this.afs.collection('clientes').add(obj);
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
