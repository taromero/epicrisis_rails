class InfeccionController < ApplicationController

	def index
		epi = Epicrisis.find(params[:epicrisi_id])
		render json: epi.infeccion
	end

	def update
		epi = Epicrisis.find(params[:id])
		epi.infeccion = epi.infeccion || Infeccion.new 
		epi.infeccion.nombre = params[:infeccion][:nombre]
		epi.infeccion.save!
		epi.save!
		render json: epi.infeccion
	end

end