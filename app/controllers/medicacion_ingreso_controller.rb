class MedicacionIngresoController < ApplicationController

	def show
		epi = Epicrisis.find(params[:epicrisi_id])
		render json: epi.medicacion_ingreso
	end

	def update
		epi = Epicrisis.find(params[:epicrisi_id])
		medicacion_ingreso = epi.medicacion_ingreso
		medicacion_ingreso = medicacion_ingreso || Medicacioningreso.new
		medicacion_ingreso.update_attributes(params[:medicacion_ingreso])

		medicacion_ingreso.save!
		epi.save!
		render json: epi.infeccion
	end

end