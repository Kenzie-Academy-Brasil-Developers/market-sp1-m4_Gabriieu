import { NextFunction, Request, Response, request } from "express";
import { market } from "./db";
import { iProduct } from "./interfaces";

export const nameValidation = (request: Request, response: Response, next: NextFunction) => {
    const productName: iProduct[] = request.body

    
    productName.forEach(product => {
        if(market.find(elem => elem.name === product.name)){
            return response.status(409).json({error: 'Product already exists'})
        }
        return next()
    })
    
}

export const idValidation = (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id

    const index = market.findIndex(product => product.id === Number(id))
    
    if(!market.find(product => product.id === Number(id))){
        return response.status(404).json({error: 'Product not found'})
    }

    response.locals.product = {
        product_id: id,
        product_index: index
    }
    return next()
}

export const objectKeyValidation = (request: Request, response: Response, next: NextFunction) =>{

    const newData = request.body
    
    const unallowedKey = ['id', 'expiration_data', 'section']

    unallowedKey.forEach(key => {
        if(key in newData){
            return response.status(200).json(
                {
                section: 'Não é possível alterar a seção',
                id: 0,
                expirationDate: 'Não é possível alterar a data de expiração'
                }
                
            )
        }
    })
    
    return next()
}

export const patchNameValidation = (request: Request, response: Response, next: NextFunction) => {
    const name = request.body.name

    market.forEach(product => {
        if(product.name === name){
            return response.status(409).json({error: `${name} is already registered`})
        }
    })

    return next()
}