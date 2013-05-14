class InfeccionController < ApplicationController

	def show
		epi = Epicrisis.find(params[:epicrisi_id])
		render json: epi.infeccion
	end

	def update
		epi = Epicrisis.find(params[:epicrisi_id])
		infeccion = epi.infeccion
		infeccion = infeccion || Infeccion.new 
		infeccion.nombre = params[:nombre]
		params_ascitis = params[:ascitis]
		infeccion.ascitis.positivo = 
		if params_ascitis[:realizado] == false and params_ascitis[:positivo] == false
			infeccion.ascitis.positivo = nil
		else
			params_ascitis[:positivo]
		end
		infeccion.save!
		epi.save!
		render json: epi.infeccion
	end

end