class InfeccionController < ApplicationController

	def update
		@epi = Epicrisis.find(params[:id])
		@epi.infeccion.nombre = params[:infeccion][:nombre]
		render json: @epi.save!
	end

end