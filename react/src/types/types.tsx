export interface ProductCreate {
  productName: string;
  productValue: string;
  productDescription: string;
}

export interface Product extends ProductCreate{
    _id: string;
}

export interface ClientCreate {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
}

export interface Client extends ClientCreate{
    _id: string;
}

export interface EnterpriseCreate {
  tradeName: string;
  corporateName: string;
  cnpj: string;
}

export interface Enterprise extends EnterpriseCreate{
    _id: string;
}