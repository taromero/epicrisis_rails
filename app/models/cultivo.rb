class Cultivo < CultivoGenerico
	attr_accessible :nombre, :positivo, :infeccion
	belongs_to :infeccion, :autosave => true
end