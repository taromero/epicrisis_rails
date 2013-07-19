require "active_record/validations.rb"

module ErrorHandlerHelper

  def self.included(base)
    base.instance_eval do 

      rescue_from ActiveRecord::RecordInvalid do |ex|
      	# binding.pry
        render json: {errors: [ex.record.errors.messages.keys[0].to_s + ': ' + 
        				ex.record.errors.messages.values[0].to_s], status: 500}.to_json, location: nil, status: 500
      end

    end  
  end 

end
