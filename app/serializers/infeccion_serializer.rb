class InfeccionSerializer < ActiveModel::Serializer
  attributes :id, :nombre, :antibiotico_usado, :shock_septico, :curacion
  has_many :cultivos
end
