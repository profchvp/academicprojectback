import modelDashboard from "../models/model.dashboard.js";

function DashboardResumos(req, res){    
          
    modelDashboard.DashboardResumos(req.query.id_usuario, function(err, result){            
        
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }      
    });      
}

function DashboardNegociosAnual(req, res){    
          
    modelDashboard.DashboardNegociosAnual(function(err, result){            
        
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }      
    });      
}


export default {DashboardResumos, DashboardNegociosAnual};