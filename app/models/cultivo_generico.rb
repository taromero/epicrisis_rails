class CultivoGenerico < ActiveRecord::Base
	attr_accessible :nombre, :positivo, :infeccion
	belongs_to :infeccion, :autosave => true

	validate :no_ascitis_specific_attrs, unless: lambda { |e| e.type === "Ascitis" }

  	def no_ascitis_specific_attrs
    	if not (gasa.nil? && proteinas_totales.nil? && recuento_de_neutrofilos.nil? && citologico.nil?)
    		self.errors[:atributos_erroneos] = 'No se pueden asignar atributos especificos de ascitis a otros cultivos'
    	end
  	end
end