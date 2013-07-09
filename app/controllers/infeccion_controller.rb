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
		infeccion.shock_septico = params[:shock_septico]
		infeccion.curacion = params[:curacion]

		update_ascitis(infeccion)
		update_hemocultivos(infeccion)

		infeccion.save!
		epi.save!
		render json: epi.infeccion
	end

	private

	def update_ascitis(infeccion)
		params_ascitis = params[:ascitis]
		if params_ascitis
			if params_ascitis[:realizado] == false and params_ascitis[:positivo] == false
				infeccion.ascitis.positivo = nil
			else
				infeccion.ascitis.positivo = params_ascitis[:positivo]
			end
			ascitisNonMassUpdatableParams = ['created_at', 'id', 'updated_at', 'infeccion_id', 'realizado', 'positivo']
			updatable_ascitis_params = params_ascitis.delete_if { |key| ascitisNonMassUpdatableParams.include? key }
			infeccion.ascitis.update_attributes(params_ascitis)
		end
	end

	def update_hemocultivos(infeccion)
		params_hemocultivos = params[:hemocultivos]
		if params_hemocultivos
			if params_hemocultivos[:realizado] == false and params_hemocultivos[:positivo] == false
				infeccion.hemocultivos.positivo = nil
			else
				infeccion.hemocultivos.positivo = params_hemocultivos[:positivo]
			end
		end
	end

end