const{ randomUUID} = require('crypto')

const tenants=[]

const tenantRepository={
    findById: async(id)=> tenants.find(t=>t.id===id) || null,

    findByName: async(name)=> tenants.find(t=>t.name===name)|| null,

    create: async(data)=>{
        const tenant={ id: randomUUID(), ...data, isActive: true, createdAt:new Date()}   //corrected
        tenants.push(tenant)

        return tenant 
    },

    update: async(id, data)=>{
        const index= tenants.findIndex(t=>t.id===id)
        if(index===-1) return null
        tenants[index]={ ...tenants[index], ...data}

        return tenants[index]
    }, 

    getAll: async()=> tenants 


    
}

module.exports={tenantRepository}

