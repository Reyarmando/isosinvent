import { BookOpenIcon } from "@heroicons/react/outline"
import { db } from "../../firebase"
import { collection, addDoc, onSnapshot, doc, getDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'

const DocPDF = () => {


    const ProviderCollection = collection(db, "providers")

    return (
        <div className="container">
            <div className="row align-items-start border border-black text-center">
                <div className="col">
                    <ol>
                        <h5>Datos de contacto:</h5>
                        <li>Av. Argentina 105 S.R. Pachacutec Cerro colorado</li>
                        <li>ciudad: Arequipa</li>
                        <li>RUC: 2055587456</li>
                        <li>Contacto: 987654321 - 986543217</li>
                        <li>E-mail: gerencia@mjwprov.com</li>
                    </ol>
                </div>
                <div className="col">
                    <h1>ORDEN DE COMPRA</h1>
                </div>
                <div className="col">
                    <p className="flex justify-content-center"><BookOpenIcon className=" h-20 w-20"></BookOpenIcon></p>
                    <h2>OC20220601</h2>
                    <h4>fecha: 24/06/2022</h4>
                </div>
            </div>
            <div className="row align-items-center">
                <div class="col">
                    <ol>
                        <h5>Datos de provider:</h5>
                        <li>Señores: FEMACO SRL</li>
                        <li>ciudad: Arequipa</li>
                        <li>RUC: 2055587456</li>
                        <li>Contacto: 987654321 - 986543217</li>
                        <li>E-mail: gerencia@ferreiros.com</li>
                    </ol>
                </div>
                <div class="col">
                    <ol>
                        <li>Fecha entrega estimada: 30/06/2022</li>
                        <li>Área Solicitante: Operaciones</li>
                        <li>Proyecto: Frente yura</li>
                    </ol>
                </div>
                <p>Sirvase enviarnos lo siguiente sujeto a las condiciones estipuladas en este pedido</p>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>CANT.</th>
                            <th>UNID.</th>
                            <th>DESCRIPT.</th>
                            <th>P.UNIT.</th>
                            <th>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>100</td>
                            <td>und.</td>
                            <td>alambre nro 16</td>
                            <td>2.17</td>
                            <td className="pl-15 border border-black">320</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="row align-items-end">
                <div class="col">
                    <label>SON: TRECIENTOS SETENTA Y SIETE CON 60/100</label>
                </div>
                <div class="col">
                    <label>CONDICIONES DE PAGO: CONTADO</label>
                </div>
                <div class="col border border-black text-end">
                    <div class="row">
                        <div class="col-6 col-sm-4">SUB-TOTAL:</div>
                        <div class="col-6 col-sm-4 border border-black">320</div>

                        <div class="w-100 d-none d-md-block"></div>

                        <div class="col-6 col-sm-4">IGV 18%:</div>
                        <div class="col-6 col-sm-4">57.60</div>

                        <div class="w-100 d-none d-md-block border border-black"></div>

                        <div class="col-6 col-sm-4">TOTAL S/.:</div>
                        <div class="col-6 col-sm-4">377.60</div>
                    </div>
                </div>
                <div className="border border-black">
                    <h5>OBSERVACIONES:</h5>
                    <p>TIEMPO DE ENTREGA: PACTADO CON EL PROVEEDOR</p>
                </div>
            </div>
        </div>
    )
}

export default DocPDF