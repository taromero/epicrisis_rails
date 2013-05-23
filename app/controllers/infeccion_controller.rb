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
		if params_ascitis[:realizado] == false and params_ascitis[:positivo] == false
			infeccion.ascitis.positivo = nil
		else
			infeccion.ascitis.positivo = params_ascitis[:positivo]
		end
		ascitisNonMassUpdatableParams = ['created_at', 'id', 'updated_at', 'infeccion_id', 'realizado', 'positivo']
		updatable_ascitis_params = params_ascitis.delete_if { |key| ascitisNonMassUpdatableParams.include? key }
		infeccion.ascitis.update_attributes(params_ascitis)
		infeccion.save!
		epi.save!
		render json: epi.infeccion
	end

end