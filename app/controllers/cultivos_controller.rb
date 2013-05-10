class CultivosController < ApplicationController

	def create
		epi = Epicrisis.find(params[:epicrisi_id])
		nuevoCultivo = Cultivo.create(nombre: params[:nombre], positivo: params[:positivo])
		epi.infeccion.cultivos << nuevoCultivo
		epi.infeccion.save!
		render json: nuevoCultivo
	end

end