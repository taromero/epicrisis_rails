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
		update_urocultivo(infeccion)

		infeccion.save!
		epi.save!
		render json: epi.infeccion
	end

	private

	#para futuro refactor
	def update_standard_cultivo(infeccion, cultivo)
		params_cultivo = params[cultivo]
		if params_cultivo
			if params_cultivo[:realizado] == false and params_cultivo[:positivo] == false
				infeccion[cultivo].positivo = nil
			else
				infeccion[cultivo].positivo = params_cultivo[:positivo]
			end
			if cultivo == :ascitis
				ascitisNonMassUpdatableParams = ['created_at', 'id', 'updated_at', 'infeccion_id', 'realizado', 'positivo']
				updatable_ascitis_params = params_cultivo.delete_if { |key| ascitisNonMassUpdatableParams.include? key }
				infeccion.ascitis.update_attributes(params_cultivo)
			end
		end
	end

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

	def update_urocultivo(infeccion)
		params_urocultivo = params[:urocultivo]
		if params_urocultivo
			if params_urocultivo[:realizado] == false and params_urocultivo[:positivo] == false
				infeccion.urocultivo.positivo = nil
			else
				infeccion.urocultivo.positivo = params_urocultivo[:positivo]
			end
		end
	end

end